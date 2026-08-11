# ReqRes API Testing Project

## Overview

This project is an automated API testing project built with Playwright
and JavaScript.

The project tests the ReqRes REST API and demonstrates API testing
skills including positive testing, negative testing, boundary testing,
authentication testing, pagination testing, CRUD operations,
response validation, schema validation, and API chaining.

The project was created as part of the NSTW 2026 Capstone project.

---

## Application Under Test

**API:** ReqRes

**Base URL:**

https://reqres.in

---

## Objectives

The main objectives of this project are to:

- Automate REST API tests using Playwright
- Validate HTTP response status codes
- Validate API response bodies
- Validate response structure and data types
- Perform positive and negative testing
- Perform boundary and validation testing
- Test authentication endpoints
- Test pagination
- Test CRUD operations
- Implement API chaining workflows
- Generate automated test reports
- Organize test data and reusable utilities
- Document API observations and test results

---

## Technology Stack

- JavaScript
- Playwright
- Node.js
- Playwright APIRequestContext
- Git
- GitHub

---

## Project Structure

```text
reqres-api-testing-project/
│____bug-reports/
│   └── registration-api-observation.md
|
|___test-data/
│   ├── auth-data.js
│   └── users.js
|
|__ test-results/
|   |___.last-run.json
|   |
│── test-summary/
│   └── final-test-summary.md
|
├── tests/
│   ├── users.spec.js
│   ├── pagination.spec.js
│   ├── single-user.spec.js
│   ├── crud.spec.js
│   ├── login.spec.js
│   ├── registration.spec.js
│   ├── api-chaining.spec.js
│   └── validation.spec.js
│
├── utils/
│   └── api-helpers.js
│__ .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md