// @ts-check
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  reporter: 'html',

  use: {
    baseURL: 'https://reqres.in',

    extraHTTPHeaders: {
      'x-api-key': process.env.REQRES_API_KEY || '',
    },

    trace: 'on-first-retry',
  },
});