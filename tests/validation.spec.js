import { test, expect } from '@playwright/test';

test.describe('API Validation and Boundary Testing', () => {

  test('should handle a negative pagination page number', async ({ request }) => {
    const response = await request.get('/api/users?page=-1');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBeTruthy();
  });


  test('should handle a non-numeric pagination value', async ({ request }) => {
    const response = await request.get('/api/users?page=abc');

    expect([200, 400]).toContain(response.status());

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('data');
  });


  test('should handle a very large pagination value', async ({ request }) => {
    const response = await request.get('/api/users?page=999999');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBeTruthy();
  });


  test('should return valid content type for users response', async ({ request }) => {
    const response = await request.get('/api/users?page=2');

    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'];

    expect(contentType).toContain('application/json');
  });


  test('should return valid content type for create user response', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: 'Validation User',
        job: 'QA Tester'
      }
    });

    expect(response.status()).toBe(201);

    const contentType = response.headers()['content-type'];

    expect(contentType).toContain('application/json');
  });


  test('should return a response with a valid user collection', async ({ request }) => {
    const response = await request.get('/api/users?page=2');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.data).toBeInstanceOf(Array);

    for (const user of responseBody.data) {
      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(typeof user.first_name).toBe('string');
      expect(typeof user.last_name).toBe('string');
      expect(typeof user.avatar).toBe('string');
    }
  });


  test('should reject login when both credentials are missing', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {}
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody.error).toBeTruthy();
  });


  test('should reject registration when both credentials are missing', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {}
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();

    expect(responseBody.error).toBeTruthy();
  });


  test('should return 404 for a non-existent user with a large ID', async ({ request }) => {
    const response = await request.get('/api/users/999999');

    expect(response.status()).toBe(404);

    const responseBody = await response.json();

    expect(responseBody).toEqual({});
  });


  test('should return 404 for a negative user ID', async ({ request }) => {
    const response = await request.get('/api/users/-1');

    expect(response.status()).toBe(404);

    const responseBody = await response.json();

    expect(responseBody).toEqual({});
  });

});