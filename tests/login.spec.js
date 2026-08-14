import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/auth-data.js';

test.describe('Authentication API - Login', () => {

  test('should login successfully with valid credentials', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: loginData.valid
    });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('token');
    expect(typeof responseBody.token).toBe('string');
    expect(responseBody.token.length).toBeGreaterThan(0);
  });


  test('should reject login when password is missing', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: loginData.missingPassword
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject login when email is missing', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: loginData.missingEmail
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject login with invalid credentials', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: loginData.invalidCredentials
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject login with an invalid email format', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'invalid-email',
        password: loginData.valid.password
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject login with an empty request body', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {}
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject login with an empty email', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: '',
        password: loginData.valid.password
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject login with an empty password', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: loginData.valid.email,
        password: ''
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });

});