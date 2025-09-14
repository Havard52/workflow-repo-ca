# Workflow repo for the CA

This repository contains a frontend project using tailwind CSS, with tests powered by playwright. It also have linting and formatting setup via eSLint and prettier, and git hooks with huskyu.

## What you need

- Node.js v18+
- npm

## Installation

1. Clone the repo.

2. istall dependencies in terminal: npm install

3. Create a ".env" file with:

BASE_URL=http://localhost:8080
TEST_USER_EMAIL=your-email@example.com
TEST_USER_PASSWORD=yourpassword

as done in "env.eksempel".

use .gitignore on your env file, to hide your userinformation.

## Start project

Start local server and tailwind in terminal:

npm run dev:full

## Run playwright tests

Check if local server is on. Write in terminal:

npx playwright test

## Linting and formatting

All staged files are automaticly formatted and linted before a commit.
