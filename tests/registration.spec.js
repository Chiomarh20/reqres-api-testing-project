import { test, expect } from '@playwright/test';

test.describe('Authentication API - Registration', () => {

  test('should reject registration for an undefined user', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: 'sydney@fife',
        password: 'pistol'
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBe(
      'Note: Only defined users succeed registration'
    );
  });


  test('should reject registration when password is missing', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: 'sydney@fife'
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });


  test('should reject registration when email is missing', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        password: 'pistol'
      }
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
        password: 'pistol'
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
        email: 'sydney@fife',
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
        password: 'pistol'
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
        email: 'sydney@fife',
        password: null
      }
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('error');
    expect(responseBody.error).toBeTruthy();
  });

});