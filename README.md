# ReqRes API Testing Project

## Overview

This project is an automated API testing project built with Playwright and JavaScript.

The project tests the ReqRes REST API and covers different API testing scenarios, including positive and negative testing, authentication, pagination, CRUD operations, response validation, boundary testing, and API chaining.

This project was created as part of the NSTW 2026 Capstone project.

## Application Under Test

**API:** ReqRes

**Base URL:** https://reqres.in

## Testing Objectives

The main objectives of this project are to:

- Automate REST API tests using Playwright
- Validate HTTP response status codes
- Validate API response bodies
- Validate response structure and data types
- Perform positive and negative testing
- Test authentication endpoints
- Test pagination
- Test CRUD operations
- Perform boundary and validation testing
- Implement API chaining workflows
- Organize test data and reusable utilities
- Generate automated test reports
- Document API observations and test results

## Technology Stack

- JavaScript
- Playwright
- Node.js
- Playwright APIRequestContext
- Git
- GitHub

## Test Coverage

The project currently covers:

### Users API

- Retrieve users
- Retrieve a single user
- Validate user response fields
- Validate user data types
- Handle non-existent users

### Pagination

- Retrieve users from different pages
- Validate pagination metadata
- Validate empty results for unavailable pages
- Validate requested page numbers
- Validate user IDs in paginated responses
- Test negative pagination values
- Test non-numeric pagination values
- Test very large pagination values

### Authentication

#### Login

- Successful login
- Login with missing credentials
- Login with invalid credentials
- Login with empty credentials
- Login with invalid email format

#### Registration

- Registration validation
- Registration with missing credentials
- Registration with invalid input
- Registration with empty credentials
- Registration with null password
- Undefined user registration behavior

### CRUD Operations

- Create users
- Create users with different valid data
- Create users with additional fields
- Update users using PUT
- Update users using PATCH
- Delete users
- Handle incomplete request data
- Handle updates to non-existent users

### API Chaining

- Create a user and update the generated user
- Create a user and delete the generated user
- Retrieve a user and reuse the returned ID
- Create, update, and delete a user in one workflow

### Validation and Boundary Testing

- Negative pagination values
- Non-numeric pagination values
- Very large pagination values
- Invalid user IDs
- Response content type
- Response data types
- User response structure
- Authentication validation

## Project Structure

```text
reqres-api-testing-project/
│
├── bug-reports/
│   └── registration-api-observation.md
│
├── test-data/
│   ├── auth-data.js
│   └── users.js
│
├── test-summary/
│   └── final-test-summary.md
│
├── tests/
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
│
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
```

## Test Execution

Install the project dependencies:

```bash
npm install
```

Run all automated API tests:

```bash
npx playwright test
```

List all available tests:

```bash
npx playwright test --list
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.js
```

View the HTML test report:

```bash
npx playwright show-report
```

## Test Results

The latest test execution completed successfully:

- **51 tests passed**
- **0 tests failed**
- **100% pass rate**
- **Execution time:** 18.1 seconds
- **Workers:** 1

The test suite was executed using:

```bash
npm test

The test suite contains **51 automated tests across 7 test files**.

## API Observation

During testing, an API behavior was observed on the registration endpoint.

The following request:

```text
POST /api/register
```

using the test data:

```text
email: sydney@fife
password: pistol
```

returned HTTP `400` with the response:

```text
Missing email or username
```

This behavior has been documented in:

```text
bug-reports/registration-api-observation.md
```

The observation is retained as part of the API testing documentation.

## Reusable Test Data and Utilities

Test data is separated from the test scripts and maintained in the `test-data` directory.

Reusable API helper functions are maintained in:

```text
utils/api-helpers.js
```

This helps improve test readability, maintainability, and reusability.

## Security

API keys and environment-specific configuration values are stored in environment variables and are not committed to the repository.

The `.env` file is excluded from Git using `.gitignore`.

A `.env.example` file is provided to show the required environment variable structure without exposing sensitive values.

## Author

**Chioma Mary Patrick**

QA Engineer | Software Tester