# Playwright Sonar Converter

[![npm version](https://badge.fury.io/js/playwright-sonar-converter.svg)](https://badge.fury.io/js/playwright-sonar-converter)
![Node.js CI](https://github.com/yourusername/playwright-sonar-converter/workflows/Node.js%20CI/badge.svg)

A TypeScript module for converting Playwright test execution reports from JUnit XML format to a generic test data format for SonarQube.

## Installation

```bash
npm install playwright-sonar-converter
```

## Usage

```typescript
import { convertPlaywrightToSonar, TestStatus } from 'playwright-sonar-converter';

const reportPath = '/path/to/reports';
convertPlaywrightToSonar(reportPath);


```