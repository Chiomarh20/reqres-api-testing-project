# API Observation Report

## OBS-001 — Registration endpoint rejects undefined test user

### Summary

During API testing, the `/api/register` endpoint was observed to reject
registration attempts for the test user `sydney@fife`.
The endpoint returns HTTP 400 with an error message indicating that only
defined users are allowed to register successfully.

### Endpoint
POST `/api/register`

### Request
```json
{
  "email": "sydney@fife",
  "password": "pistol"
}

Expected Result
The API should provide a clear and consistent response when registration
data does not correspond to a supported test user. 

Actual Result
The API returns HTTP 400 with an error response indicating that only
defined users can successfully register.
Example:
{
  "error": "Note: Only defined users succeed registration"
}

Severity- Medium

Priority- Medium

Status- Open 

Impact:
The registration endpoint does not allow arbitrary test users to be
registered successfully.
As a result, successful registration testing requires a user account
supported by the API's current test data.

Reproduction Steps:
Send a POST request to /api/register.
Provide an email address that is not supported by the API's defined
registration test users.
Provide a valid password.
Submit the request.
Observe the HTTP status and response body.
Evidence
The behavior was captured during Playwright API test execution.

Observed result:
Status: 400
Response contains an error property
Error message indicates that only defined users succeed registration
Automation Test

The behavior is covered by:
tests/registration.spec.js

Test:
should reject registration for an undefined user

Recommendation
Confirm the currently supported registration test data in the API
documentation and provide a stable test account for validating a
successful registration scenario.