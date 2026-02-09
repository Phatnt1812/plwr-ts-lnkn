import dotenv from 'dotenv';
dotenv.config();
export type TestEnv = 'local' | 'staging' | 'prod';
export const env = {
  name: (process.env.TEST_ENV as TestEnv) || 'local',

  baseUrl:
    process.env.BASE_URL ||
    'https://www.linkedin.com',

  headless: process.env.HEADLESS === 'true',

  device: process.env.DEVICE ,

  slowMo: process.env.SLOW_MO
    ? Number(process.env.SLOW_MO)
    : 0,

  timeout: process.env.TIMEOUT
    ? Number(process.env.TIMEOUT)
    : 30_000,

  retries: process.env.RETRIES
    ? Number(process.env.RETRIES)
    : 0
};
