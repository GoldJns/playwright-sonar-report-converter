const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { parseString } = require('xml2js');
const xmlbuilder = require('xmlbuilder');
const playwrightResultName = 'e2e-junit-results.xml';
const sonarResultName = 'sonar-report.xml';
const reportDir = 'reports';
const reportPath = path.resolve(__dirname, reportDir);
const reportFile = path.join(reportPath, playwrightResultName);
const reportXml = readFileSync(reportFile, 'utf-8');

parseString(reportXml, (err: Error, result: any) => {
    if (err) {
        console.error('Error parsing JUnit XML:', err);
        return;
    }

    const root = xmlbuilder.begin().ele('testExecutions', { version: '1' });

    enum TestStatus {
        failure = 'failure',
        skipped = 'skipped',
        error = 'error',
    }
    interface FailureNode {
        $: {
            message: string;
        };
    }

    interface TestCase {
        $: {
            name: string;
            time: string;
            [status: string]: string;
        };
        failure: FailureNode;
        skipped: FailureNode;
        error: FailureNode;
    }

    interface TestSuite {
        $: {
            name: string;
        };
        testcase: TestCase[];
    }

    result.testsuites.testsuite.forEach((suite: TestSuite) => {
        const filePath = suite.$.name;
        const fileNode = root.ele('file', { path: filePath });
        const testOutcomes = Object.values(TestStatus);

        suite.testcase.forEach((testCase: TestCase) => {
            const testName = testCase.$.name;
            const duration = parseFloat(testCase.$.time) * 1000; //  milliseconds
            const testCaseNode = fileNode.ele('testCase', { name: testName, duration: duration.toFixed(0) });
            let testPassed = true;
            for (const outcome of testOutcomes) {
                if (testCase[outcome]) {
                    testPassed = false;
                    testCaseNode.ele(outcome, { message: '' });
                    break;
                }
            }
            if (testPassed) {
                testCaseNode.up();
            }
        });
        fileNode.up();
    });

    const sonarQubeXml = root.end({ pretty: true, headless: true });
    writeFileSync(`${reportPath}/${sonarResultName}`, sonarQubeXml);
});