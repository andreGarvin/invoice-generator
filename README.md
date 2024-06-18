# invoice-generator: Simple invoice generator app (WIP)

- [Prerequisites](#Prerequisites)
- [Getting Started](#getting-started)

## Prerequisites

1. Install `nvm`, [Here is the documentation to install nvm](https://github.com/nvm-sh/nvm#installing-and-updating), use the `.nvmrc` file to install the correct node version for this project by running this command in your terminal
```bash
  nvm use
```
2. You will also need to install `docker` your computer in order to run the PostgreSQL database for the application.

## Getting Started

1. Switch to the `feat/<branch name>` branch.
1. Install dependencies using `npm install` for this project
1. Then run `npm run build` to get a build output of the project

Make sure to create a `.env.local` file for all your secrets needed for the application, just copy and paste whats in the `.env` file by running this command in your terminal

```bash
cat .env > .env.local
```

## NPM Scripts
* `"dev"`: Running NextJS application in development mode
* `"build"`: Build the NextJS application
* `"start"`: Run the NextJS application
* `"typecheck"`: Just runs a `tsc` to unsure the project build works, only used for deployment
