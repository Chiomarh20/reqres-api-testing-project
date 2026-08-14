import { test, expect } from '@playwright/test';
import { registrationData } from '../test-data/auth-data.js';

test.describe('Authentication API - Registration', () => {

  test('should reject registration for an undefined user', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: registrationData.undefinedUser
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(typeof responseBody.error).toBe('string');
    expect(responseBody.error.length).toBeGreaterThan(0);
  });


  test('should reject registration when password is missing', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: registrationData.missingPassword
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject registration when email is missing', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: registrationData.missingEmail
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject registration with an empty request body', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {}
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject registration with an empty email', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: '',
        password: registrationData.undefinedUser.password
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject registration with an empty password', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: registrationData.undefinedUser.email,
        password: ''
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject registration with an invalid email format', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: 'invalid-email',
        password: registrationData.undefinedUser.password
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject registration when password is null', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: registrationData.undefinedUser.email,
        password: null
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });

});