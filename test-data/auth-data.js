export const loginData = {
  valid: {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  },

  missingEmail: {
    password: 'cityslicka'
  },

  missingPassword: {
    email: 'eve.holt@reqres.in'
  },

  invalidCredentials: {
    email: 'invalid@example.com',
    password: 'wrongpassword'
  }
};

export const registrationData = {
  undefinedUser: {
    email: 'sydney@fife',
    password: 'pistol'
  },

  missingEmail: {
    password: 'pistol'
  },

  missingPassword: {
    email: 'sydney@fife'
  }
};