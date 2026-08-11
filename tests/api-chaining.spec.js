import { test, expect } from '@playwright/test';

test.describe('API Chaining Workflow', () => {

  test('should create a user and use the generated ID in a follow-up request', async ({ request }) => {

    // Step 1: Create a user
    const createResponse = await request.post('/api/users', {
      data: {
        name: 'Chioma',
        job: 'QA Engineer'
      }
    });

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    expect(createdUser).toHaveProperty('id');
    expect(createdUser).toHaveProperty('createdAt');

    const userId = createdUser.id;

    // Step 2: Use the generated ID in an update request
    const updateResponse = await request.put(`/api/users/${userId}`, {
      data: {
        name: 'Chioma Updated',
        job: 'Senior QA Engineer'
      }
    });

    expect(updateResponse.status()).toBe(200);

    const updatedUser = await updateResponse.json();

    expect(updatedUser.name).toBe('Chioma Updated');
    expect(updatedUser.job).toBe('Senior QA Engineer');
    expect(updatedUser).toHaveProperty('updatedAt');
  });


  test('should create a user and then delete the created user', async ({ request }) => {

    // Step 1: Create
    const createResponse = await request.post('/api/users', {
      data: {
        name: 'Test User',
        job: 'QA Tester'
      }
    });

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    expect(createdUser).toHaveProperty('id');

    const userId = createdUser.id;

    // Step 2: Delete using the generated ID
    const deleteResponse = await request.delete(`/api/users/${userId}`);

    expect(deleteResponse.status()).toBe(204);
  });


  test('should retrieve a user and validate the returned user ID', async ({ request }) => {

    // Step 1: Retrieve user
    const getResponse = await request.get('/api/users/2');

    expect(getResponse.status()).toBe(200);

    const userResponse = await getResponse.json();

    const userId = userResponse.data.id;

    expect(userId).toBe(2);

    // Step 2: Use the retrieved ID in another request
    const secondResponse = await request.get(`/api/users/${userId}`);

    expect(secondResponse.status()).toBe(200);

    const secondUserResponse = await secondResponse.json();

    expect(secondUserResponse.data.id).toBe(userId);
  });


  test('should create a user, update it, and then delete it', async ({ request }) => {

    // Step 1: Create
    const createResponse = await request.post('/api/users', {
      data: {
        name: 'Chained User',
        job: 'QA Engineer'
      }
    });

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    const userId = createdUser.id;

    expect(userId).toBeTruthy();

    // Step 2: Update
    const updateResponse = await request.patch(`/api/users/${userId}`, {
      data: {
        job: 'Automation QA Engineer'
      }
    });

    expect(updateResponse.status()).toBe(200);

    const updatedUser = await updateResponse.json();

    expect(updatedUser.job).toBe('Automation QA Engineer');
    expect(updatedUser).toHaveProperty('updatedAt');

    // Step 3: Delete
    const deleteResponse = await request.delete(`/api/users/${userId}`);

    expect(deleteResponse.status()).toBe(204);
  });

});