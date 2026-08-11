export async function getJsonResponse(response) {
  const body = await response.json();

  return {
    status: response.status(),
    headers: response.headers(),
    body
  };
}


export function expectUserSchema(expect, user) {
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('first_name');
  expect(user).toHaveProperty('last_name');
  expect(user).toHaveProperty('avatar');

  expect(typeof user.id).toBe('number');
  expect(typeof user.email).toBe('string');
  expect(typeof user.first_name).toBe('string');
  expect(typeof user.last_name).toBe('string');
  expect(typeof user.avatar).toBe('string');
}


export function expectErrorResponse(expect, responseBody) {
  expect(responseBody).toHaveProperty('error');
  expect(typeof responseBody.error).toBe('string');
  expect(responseBody.error.length).toBeGreaterThan(0);
}