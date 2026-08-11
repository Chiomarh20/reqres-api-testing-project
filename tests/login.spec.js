import { test, expect } from '@playwright/test';

test.describe('Authentication API - Login', () => {

  test('should login successfully with valid credentials', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('token');
    expect(typeof responseBody.token).toBe('string');
    expect(responseBody.token.length).toBeGreaterThan(0);
  });


  test('should reject login when password is missing', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'eve.holt@reqres.in'
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject login when email is missing', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        password: 'cityslicka'
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject login with invalid credentials', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'invalid@example.com',
        password: 'wrongpassword'
      }
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
        password: 'cityslicka'
      }
    });

    expect([400, 401]).toContain(response.status());
  });


  test('should reject login with an empty request body', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {}
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
  });


  test('should reject login with an empty email', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: '',
        password: 'cityslicka'
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
  });


  test('should reject login with an empty password', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: ''
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
  });

});