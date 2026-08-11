import { test, expect } from '@playwright/test';

test.describe('Users API - GET Users', () => {

  test('GET users should return a list of users', async ({ request }) => {
    const response = await request.get('/api/users?page=2');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('page');
    expect(responseBody).toHaveProperty('per_page');
    expect(responseBody).toHaveProperty('total');
    expect(responseBody).toHaveProperty('total_pages');
    expect(responseBody).toHaveProperty('data');

    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBeGreaterThan(0);

    const firstUser = responseBody.data[0];

    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('email');
    expect(firstUser).toHaveProperty('first_name');
    expect(firstUser).toHaveProperty('last_name');
    expect(firstUser).toHaveProperty('avatar');
  });

});