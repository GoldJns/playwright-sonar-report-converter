# Playwright Sonar Converter

WIP!

[![npm version](https://badge.fury.io/js/playwright-sonar-converter.svg)](https://badge.fury.io/js/playwright-sonar-converter)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

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