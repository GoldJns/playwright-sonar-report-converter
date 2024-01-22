# Playwright Sonar Converter

WIP!

[![npm version](https://badge.fury.io/js/playwright-sonar-converter.svg)](https://badge.fury.io/js/playwright-sonar-converter)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![SonarQube](https://img.shields.io/badge/SonarQube-black?style=for-the-badge&logo=sonarqube&logoColor=4E9BCD)

A module for converting Playwright test execution reports from JUnit XML format to [GenericTestData](https://docs.sonarsource.com/sonarqube/9.8/analyzing-source-code/test-coverage/generic-test-data/#generic-test-execution) format for SonarQube.

## Installation

```bash
npm install playwright-sonar-converter --save
```

## Usage

```typescript
import { convertPlaywrightToSonar, TestStatus } from 'playwright-sonar-converter';

const reportPath = '/path/to/reports';
convertPlaywrightToSonar(reportPath);
```

## SonarQube

The generated file is now in GenericTestData format and can be passed in `sonar.properties`

```sh
sonar.testExecutionReportPaths="<reportPath>"
```

In Sonarqube you can see the number of passed tests.

