import { test, expect } from '@playwright/test';

test.describe('Users API - Single User', () => {

  test('should retrieve a single user with a valid ID', async ({ request }) => {
    const response = await request.get('/api/users/2');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('data');

    expect(responseBody.data).toHaveProperty('id');
    expect(responseBody.data).toHaveProperty('email');
    expect(responseBody.data).toHaveProperty('first_name');
    expect(responseBody.data).toHaveProperty('last_name');
    expect(responseBody.data).toHaveProperty('avatar');

    expect(responseBody.data.id).toBe(2);
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


  test('should return a valid user ID as a number', async ({ request }) => {
    const response = await request.get('/api/users/2');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(typeof responseBody.data.id).toBe('number');
    expect(responseBody.data.id).toBeGreaterThan(0);
  });


  test('should return a valid email for a single user', async ({ request }) => {
    const response = await request.get('/api/users/2');

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.data.email).toContain('@');
    expect(responseBody.data.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });


  test('should return consistent user data for repeated requests', async ({ request }) => {
    const firstResponse = await request.get('/api/users/2');
    const secondResponse = await request.get('/api/users/2');

    expect(firstResponse.status()).toBe(200);
    expect(secondResponse.status()).toBe(200);

    const firstBody = await firstResponse.json();
    const secondBody = await secondResponse.json();

    expect(firstBody.data.id).toBe(secondBody.data.id);
    expect(firstBody.data.email).toBe(secondBody.data.email);
    expect(firstBody.data.first_name).toBe(secondBody.data.first_name);
    expect(firstBody.data.last_name).toBe(secondBody.data.last_name);
  });

});