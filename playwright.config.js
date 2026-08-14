// @ts-check
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,
  workers: 1,

  reporter: 'html',

  use: {
    baseURL: 'https://reqres.in',

    extraHTTPHeaders: {
      'x-api-key': process.env.REQRES_API_KEY || '',
      'User-Agent': 'reqres-qa-tests/1.0',
    },
  },
});