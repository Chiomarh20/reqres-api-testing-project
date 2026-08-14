import { test, expect } from '@playwright/test';
import { userData } from '../test-data/users.js';

test.describe('Users API - CRUD Operations', () => {

  test('should create a new user successfully', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: userData.createUser
    });

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');

    expect(responseBody.name).toBe(userData.createUser.name);
    expect(responseBody.job).toBe(userData.createUser.job);

    expect(typeof responseBody.id).toBe('string');
    expect(typeof responseBody.createdAt).toBe('string');
  });


  test('should create a user with different valid data', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: userData.secondUser
    });

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.name).toBe(userData.secondUser.name);
    expect(responseBody.job).toBe(userData.secondUser.job);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
  });


  test('should create a user with additional fields', async ({ request }) => {
    const user = {
      ...userData.automationUser,
      department: 'Quality Assurance'
    };

    const response = await request.post('/api/users', {
      data: user
    });

    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.name).toBe(user.name);
    expect(responseBody.job).toBe(user.job);
    expect(responseBody.department).toBe(user.department);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
  });


  test('should update a user using PUT', async ({ request }) => {
    const response = await request.put('/api/users/2', {
      data: userData.updateUser
    });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.name).toBe(userData.updateUser.name);
    expect(responseBody.job).toBe(userData.updateUser.job);
    expect(responseBody).toHaveProperty('updatedAt');
    expect(typeof responseBody.updatedAt).toBe('string');
  });


  test('should update a user using PATCH', async ({ request }) => {
    const response = await request.patch('/api/users/2', {
      data: {
        job: userData.automationUser.job
      }
    });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.job).toBe(userData.automationUser.job);
    expect(responseBody).toHaveProperty('updatedAt');
    expect(typeof responseBody.updatedAt).toBe('string');
  });


  test('should update a user with multiple fields using PATCH', async ({ request }) => {
    const response = await request.patch('/api/users/2', {
      data: userData.automationUser
    });

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    expect(responseBody.name).toBe(userData.automationUser.name);
    expect(responseBody.job).toBe(userData.automationUser.job);
    expect(responseBody).toHaveProperty('updatedAt');
    expect(typeof responseBody.updatedAt).toBe('string');
  });


  test('should delete a user successfully', async ({ request }) => {
    const response = await request.delete('/api/users/2');

    expect(response.status()).toBe(204);
  });


  test('should delete another valid user successfully', async ({ request }) => {
    const response = await request.delete('/api/users/5');

    expect(response.status()).toBe(204);
  });


  test('should handle creation with empty request body', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {}
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
  });


  test('should handle creation with only a name', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: userData.createUser.name
      }
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.name).toBe(userData.createUser.name);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
  });


  test('should handle creation with only a job', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        job: userData.createUser.job
      }
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.job).toBe(userData.createUser.job);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
  });


  test('should handle update of a non-existent user', async ({ request }) => {
    const response = await request.put('/api/users/9999', {
      data: {
        name: userData.createUser.name,
        job: userData.createUser.job
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.name).toBe(userData.createUser.name);
    expect(responseBody.job).toBe(userData.createUser.job);
    expect(responseBody).toHaveProperty('updatedAt');
  });

});