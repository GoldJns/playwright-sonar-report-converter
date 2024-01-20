var _a = require('fs'), readFileSync = _a.readFileSync, writeFileSync = _a.writeFileSync;
var path = require('path');
var parseString = require('xml2js').parseString;
var xmlbuilder = require('xmlbuilder');
var playwrightResultName = 'e2e-junit-results.xml';
var sonarResultName = 'sonar-report.xml';
var reportDir = 'reports';
var reportPath = path.resolve(__dirname, reportDir);
var reportFile = path.join(reportPath, playwrightResultName);
var reportXml = readFileSync(reportFile, 'utf-8');
parseString(reportXml, function (err, result) {
    if (err) {
        console.error('Error parsing JUnit XML:', err);
        return;
    }
    var root = xmlbuilder.begin().ele('testExecutions', { version: '1' });
    var TestStatus;
    (function (TestStatus) {
        TestStatus["failure"] = "failure";
        TestStatus["skipped"] = "skipped";
        TestStatus["error"] = "error";
    })(TestStatus || (TestStatus = {}));
    result.testsuites.testsuite.forEach(function (suite) {
        var filePath = suite.$.name;
        var fileNode = root.ele('file', { path: filePath });
        var testOutcomes = Object.values(TestStatus);
        suite.testcase.forEach(function (testCase) {
            var testName = testCase.$.name;
            var duration = parseFloat(testCase.$.time) * 1000; //  milliseconds
            var testCaseNode = fileNode.ele('testCase', { name: testName, duration: duration.toFixed(0) });
            var testPassed = true;
            for (var _i = 0, testOutcomes_1 = testOutcomes; _i < testOutcomes_1.length; _i++) {
                var outcome = testOutcomes_1[_i];
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
    var sonarQubeXml = root.end({ pretty: true, headless: true });
    writeFileSync("".concat(reportPath, "/").concat(sonarResultName), sonarQubeXml);
});
