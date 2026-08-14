import { test, expect } from '@playwright/test';

test.describe('API Chaining Workflow', () => {

  test('should create a user and use the generated ID in a follow-up request', async ({ request }) => {

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

    expect(userId).toBeTruthy();

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

    const createResponse = await request.post('/api/users', {
      data: {
        name: 'Chioma',
        job: 'QA Tester'
      }
    });

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    expect(createdUser).toHaveProperty('id');

    const userId = createdUser.id;

    expect(userId).toBeTruthy();

    const deleteResponse = await request.delete(`/api/users/${userId}`);

    expect(deleteResponse.status()).toBe(204);
  });


  test('should retrieve a user and use the returned ID in another request', async ({ request }) => {

    const getResponse = await request.get('/api/users/2');

    expect(getResponse.status()).toBe(200);

    const userResponse = await getResponse.json();

    expect(userResponse).toHaveProperty('data');
    expect(userResponse.data).toHaveProperty('id');

    const userId = userResponse.data.id;

    expect(userId).toBe(2);

    const secondResponse = await request.get(`/api/users/${userId}`);

    expect(secondResponse.status()).toBe(200);

    const secondUserResponse = await secondResponse.json();

    expect(secondUserResponse).toHaveProperty('data');
    expect(secondUserResponse.data.id).toBe(userId);
  });


  test('should create, update, and delete a user using the generated ID', async ({ request }) => {

    const createResponse = await request.post('/api/users', {
      data: {
        name: 'Chioma',
        job: 'QA Engineer'
      }
    });

    expect(createResponse.status()).toBe(201);

    const createdUser = await createResponse.json();

    expect(createdUser).toHaveProperty('id');

    const userId = createdUser.id;

    expect(userId).toBeTruthy();

    const updateResponse = await request.patch(`/api/users/${userId}`, {
      data: {
        job: 'Automation QA Engineer'
      }
    });

    expect(updateResponse.status()).toBe(200);

    const updatedUser = await updateResponse.json();

    expect(updatedUser.job).toBe('Automation QA Engineer');
    expect(updatedUser).toHaveProperty('updatedAt');

    const deleteResponse = await request.delete(`/api/users/${userId}`);

    expect(deleteResponse.status()).toBe(204);
  });

});