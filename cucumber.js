/** @type {import('@cucumber/cucumber/api').IGherkinOptions} */
// Load environment variables from .env so RETRIES and TIMEOUT can be set there
require('dotenv').config();

const retriesFromEnv = process.env.RETRIES ? Number(process.env.RETRIES) : 0;
const timeoutFromEnv = process.env.TIMEOUT ? Number(process.env.TIMEOUT) : 60 * 1000;

module.exports = {
  default: {
    paths: [
      'src/features/**/*.feature'
    ],
    require: [
      'src/steps/**/*.ts'
    ],
    requireModule: [
      'ts-node/register'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
  retry: retriesFromEnv,
  timeout: timeoutFromEnv,
    failFast: false,
    publishQuiet: true
  }
};
