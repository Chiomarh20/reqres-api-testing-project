import { test, expect } from '@playwright/test';

test.describe('Users API - Single User', () => {

  test('should retrieve a single user with a valid ID', async ({ request }) => {
    const response = await request.get('/api/users/2');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('data');

    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data).toHaveProperty('email');
    expect(responseBody.data).toHaveProperty('first_name');
    expect(responseBody.data).toHaveProperty('last_name');
    expect(responseBody.data).toHaveProperty('avatar');

    expect(responseBody.data.id).toBe(2);

    expect(typeof responseBody.data.id).toBe('number');
    expect(typeof responseBody.data.email).toBe('string');
    expect(typeof responseBody.data.first_name).toBe('string');
    expect(typeof responseBody.data.last_name).toBe('string');
    expect(typeof responseBody.data.avatar).toBe('string');
  });


  test('should return 404 when requesting a non-existent user', async ({ request }) => {
    const response = await request.get('/api/users/9999');

    expect(response.status()).toBe(404);

    const responseBody = await response.json();

    expect(responseBody).toEqual({});
  });


  test('should return 404 for user ID 0', async ({ request }) => {
    const response = await request.get('/api/users/0');

    expect(response.status()).toBe(404);
  });

});