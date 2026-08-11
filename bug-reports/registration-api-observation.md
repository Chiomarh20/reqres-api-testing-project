# API Observation Report

## OBS-001 — Registration endpoint rejects previously documented test user

### Summary

The `/api/register` endpoint returns HTTP 400 when attempting to register
the test user `sydney@fife` with password `pistol`.

### Endpoint

POST `/api/register`

### Request

```json
{
  "email": "sydney@fife",
  "password": "pistol"
}

Expected Result

A valid registration request should return HTTP 200 and provide a
registration ID and authentication token.

Actual Result

The API returns HTTP 400.

Response:

{
  "error": "Note: Only defined users succeed registration"
}
Severity

Medium

Priority

Medium

Status

Open / Requires clarification

Impact

The registration scenario cannot be completed using the previously
documented test credentials. This prevents a successful-registration
test from being validated using this test data.

Reproduction Steps
Send a POST request to /api/register.
Use sydney@fife as the email.
Use pistol as the password.
Submit the request.
Observe the HTTP status and response body.
Evidence

The behavior was captured during Playwright execution.

Observed result:

Status: 400
Response: {"error":"Note: Only defined users succeed registration"}

Automation Test

The behavior is covered by:

tests/registration.spec.js

Test:

should reject registration for an undefined user

Recommendation

Confirm the currently supported registration test data in the API
documentation or provide a stable test account for successful
registration testing.