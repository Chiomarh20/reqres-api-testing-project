import { test, expect } from '@playwright/test';

test.describe('Users API - Pagination', () => {

  test('should retrieve the first page of users', async ({ request }) => {
    const response = await request.get('/api/users?page=1');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('page', 1);
    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBeGreaterThan(0);
  });


  test('should retrieve the second page of users', async ({ request }) => {
    const response = await request.get('/api/users?page=2');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('page', 2);
    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBeGreaterThan(0);
  });


  test('should return valid pagination metadata', async ({ request }) => {
    const response = await request.get('/api/users?page=2');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('page');
    expect(responseBody).toHaveProperty('per_page');
    expect(responseBody).toHaveProperty('total');
    expect(responseBody).toHaveProperty('total_pages');

    expect(typeof responseBody.page).toBe('number');
    expect(typeof responseBody.per_page).toBe('number');
    expect(typeof responseBody.total).toBe('number');
    expect(typeof responseBody.total_pages).toBe('number');

    expect(responseBody.page).toBeGreaterThan(0);
    expect(responseBody.per_page).toBeGreaterThan(0);
    expect(responseBody.total).toBeGreaterThan(0);
    expect(responseBody.total_pages).toBeGreaterThan(0);
  });


  test('should return an empty data array for a page beyond available pages', async ({ request }) => {
    const response = await request.get('/api/users?page=999');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBe(0);
  });


  test('should return the requested page number', async ({ request }) => {
    const requestedPage = 2;

    const response = await request.get(`/api/users?page=${requestedPage}`);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.page).toBe(requestedPage);
  });


  test('should return users with valid IDs on a paginated response', async ({ request }) => {
    const response = await request.get('/api/users?page=2');

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.data.length).toBeGreaterThan(0);

    for (const user of responseBody.data) {
      expect(user).toHaveProperty('id');
      expect(typeof user.id).toBe('number');
      expect(user.id).toBeGreaterThan(0);
    }
  });

});