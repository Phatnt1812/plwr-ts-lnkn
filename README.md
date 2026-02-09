# plwr-ts-lnkn

LinkedIn end-to-end tests using Cucumber (cucumber-js) + Playwright + TypeScript.

This repository contains BDD feature tests (Gherkin) driven by `cucumber-js`. Playwright is used for browser automation. Tests run via the `npm test` script and configuration picks values from a local `.env` file.

## Quick overview

- BDD runner: cucumber-js
- Browser automation: Playwright (playwright package)
- Language: TypeScript (ts-node used at runtime)
- Report outputs: `reports/cucumber-report.html` and `reports/cucumber-report.json`
- Storage state files: `src/storage/*.json` (used to reuse authenticated sessions)

## Prerequisites

- Node.js (recommended >= 16). The project has been developed and run on Windows PowerShell.
- Git

## Install

Open a PowerShell terminal in the project root and run:

```powershell
npm install
```

## Environment configuration (`.env`)

The project reads configuration from a `.env` file (dotenv). Example keys used by the test runner:

- DEVICE (``,``,``,``,``)
- TEST_ENV (local | staging | prod)
- BASE_URL (default: https://www.linkedin.com)
- HEADLESS (true|false)
- SLOW_MO (ms)
- TIMEOUT (ms) — global timeout used by tests/hooks (e.g. 30000)
- RETRIES (number) — number of times cucumber should retry failing scenarios
- USER1_EMAIL / USER1_PASSWORD / USER2_EMAIL / USER2_PASSWORD — used by the `scripts/generateSession.ts` helper

A working `.env` is required for `TIMEOUT`, `RETRIES` and `DEVICE` to be applied to the test runner.

## Common scripts

- Run tests:

```powershell
npm test
```

This runs `cucumber-js` with the configuration in `cucumber.js`.

- Generate a session (create storageState for configured users):

```powershell
npm run session
```

This runs `ts-node scripts/generateSession.ts`. Use this to create `src/storage/user1.json` and other storage-state files which are used to avoid logging in during tests.

## Running a single feature or tag

To run a single feature file:

```powershell
npx cucumber-js src/features/easy-apply.feature
```

To run tests by tag (example):

```powershell
npx cucumber-js --tags "@user=user1"
```

Note: `cucumber.js` already sets `requireModule: ['ts-node/register']` so TypeScript step definitions run without a separate build.

## Project structure (important files)

- `cucumber.js` — cucumber runner options (paths, require, retry, timeout, format). It now reads `RETRIES` and `TIMEOUT` from `.env`.
- `playwright.config.ts` — Playwright global configuration and projects/devices.
- `src/config/env.ts` — central place where `.env` values are parsed and exported as `env`.
- `src/steps/hooks.ts` — Cucumber hooks that launch Playwright, create context, apply storageState, and set the default timeout.
- `src/steps/*.ts` — step definitions (Gherkin → implementation).
- `src/pages/*.ts` — Page Object Model classes that wrap Playwright interactions.
- `src/features/*.feature` — Gherkin feature files.
- `src/storage/*.json` — saved storageState files for authenticated sessions.
- `scripts/generateSession.ts` — helper script to programmatically create storage states (via Playwright) for users.

## How it works

- On each scenario, `Before` hook in `src/steps/hooks.ts` reads the `@user=...` tag, picks the corresponding `storage` file from `src/config/users.ts`, launches a Playwright context with that storageState and navigates to the app.
- `setDefaultTimeout(env.timeout)` is used so Cucumber hooks and steps use the `TIMEOUT` value from `.env`.
- `cucumber.js` uses `dotenv` to load `RETRIES` and `TIMEOUT` so cucumber runner options follow your `.env` settings.

## Reports & artifacts

- HTML and JSON cucumber reports: `reports/cucumber-report.html`, `reports/cucumber-report.json`.
- Screenshots on failure are written to the `screenshots/` folder (config in `After` hook).
- Storage state for users: `src/storage/*.json`.


## Debugging tips

- Increase `TIMEOUT` in `.env` while debugging (e.g., `TIMEOUT=60000`).
- Set `HEADLESS=false` and `SLOW_MO` to slow playback while investigating:

```powershell
# Example .env values
HEADLESS=false
SLOW_MO=50
```

- Disable retries during debug by setting `RETRIES=0` in `.env` or in `cucumber.js`.

## Adding tests

1. Create a `.feature` file in `src/features/` with Gherkin scenarios.
2. Add step definitions under `src/steps/` (TypeScript) using `@cucumber/cucumber` decorators.
3. Use Page Objects in `src/pages/` to keep tests maintainable.

## Contributing

- Fork, create a branch, add tests, and open a PR. Keep changes small and include a short explanation and reproduction steps.

## License

Phat Nguyen
