import { test, expect } from '@playwright/test';

test.describe('Users API - CRUD Operations', () => {

  test('should create a new user successfully', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: 'Chioma',
        job: 'QA Engineer'
      }
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
    expect(responseBody.name).toBe('Chioma');
    expect(responseBody.job).toBe('QA Engineer');
  });


  test('should create a user with different valid data', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: 'John Doe',
        job: 'Software Tester'
      }
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.name).toBe('John Doe');
    expect(responseBody.job).toBe('Software Tester');
    expect(responseBody.id).toBeTruthy();
  });


  test('should create a user with additional fields', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: 'Jane',
        job: 'Developer',
        department: 'Engineering'
      }
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.name).toBe('Jane');
    expect(responseBody.job).toBe('Developer');
    expect(responseBody.department).toBe('Engineering');
    expect(responseBody.id).toBeTruthy();
  });


  test('should update a user using PUT', async ({ request }) => {
    const response = await request.put('/api/users/2', {
      data: {
        name: 'Updated User',
        job: 'Senior QA Engineer'
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.name).toBe('Updated User');
    expect(responseBody.job).toBe('Senior QA Engineer');
    expect(responseBody).toHaveProperty('updatedAt');
  });


  test('should update a user using PATCH', async ({ request }) => {
    const response = await request.patch('/api/users/2', {
      data: {
        job: 'Automation Engineer'
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.job).toBe('Automation Engineer');
    expect(responseBody).toHaveProperty('updatedAt');
  });


  test('should update a user with multiple fields using PATCH', async ({ request }) => {
    const response = await request.patch('/api/users/2', {
      data: {
        name: 'Chioma Updated',
        job: 'QA Automation Engineer'
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.name).toBe('Chioma Updated');
    expect(responseBody.job).toBe('QA Automation Engineer');
    expect(responseBody.updatedAt).toBeTruthy();
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

    expect([201, 400]).toContain(response.status());
  });


  test('should handle creation with only a name', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: 'Test User'
      }
    });

    expect([201, 400]).toContain(response.status());
  });


  test('should handle creation with only a job', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        job: 'QA Tester'
      }
    });

    expect([201, 400]).toContain(response.status());
  });


  test('should handle update of a non-existent user', async ({ request }) => {
    const response = await request.put('/api/users/9999', {
      data: {
        name: 'Unknown User',
        job: 'Tester'
      }
    });

    expect([200, 404]).toContain(response.status());
  });

});