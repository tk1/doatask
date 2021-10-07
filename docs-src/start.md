# Getting started

## Very quick start

::: danger

Use this procedure for testing purposes only, never in production.

:::

Prerequisites: You have [Docker](https://docs.docker.com/get-docker/), [Docker
Compose](https://docs.docker.com/compose/install/) and
[Node.js](https://nodejs.org/en/download/) installed. The system has been tested
on Windows 10 and Linux (Centos 6).

1. Clone the GitHub repository and change in the root folder.

1. Create an `.env` file.

    `cp server/.env.example server/.env`

1. Build and launch the system in Docker. Depending on your hardware and the
   speed of your Internet connection, this step can take a long time.

    `npm run docker`

1. Navigate  to the address [`http://localhost:8080/`](http://localhost:8080/)
   in your browser.

## Quick start 

After step 2 from above configure the environment variables. Then proceed as
above.

### Environment variables

The system can be configured via several environment variables. The value of
these environment variables is read from the `.env` file.

There is no `.env` file in the Git repository, only the example file
`.env.example`. Copy this example file to `.env` and adapt the values of the
environment variables to your needs.

Here is the content of the file `.env.example`:

```shell
NODE_ENV=development

# Postgres
POSTGRES_HOST=postgres
POSTGRES_ON_LOCALHOST=true
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432

# pgAdmin
PGADMIN_DEFAULT_EMAIL=pga@doatask.org
PGADMIN_DEFAULT_PASSWORD=pga
PGADMIN_PORT=5555

# Nest
NEST_DB_NAME=doatask
NEST_DB_USER=nest
NEST_DB_PASSWORD=nest
NEST_PORT=8080

# App
APP_ADMIN_USER=admin
APP_ADMIN_PASSWORD=admin
APP_JWT_SECRET=jwtsecret

# LTI
LTI_DB_NAME=lti
LTI_DB_USER=lti
LTI_DB_PASSWORD=lti

LTI_KEY=Secret_Key
LTI_REDIRECT_URL=http://localhost:3000
```

To make the system secure, be sure to change all passwords and the value of the
`APP_JWT_SECRET` and `LTI_KEY` variables.

When you start the system in Docker for the first time, the required databases
are automatically created in PostgreSQL. Furthermore, an admin user is created.
The name and password of this user are set by the `APP_ADMIN_USER` and
`APP_ADMIN_PASSWORD` environment variables.

## Running the system locally (not in Docker)

For your convenience, PostgreSQL is deployed with the required databases via Docker. To start the PostgreSQL instance, use

```
npm run start:pg
```

Then install the required node modules with

```
npm run install:client
npm run install:server
```

or both together with just
```
npm run install
```

Now you can start the client and the server in dev mode by

```
npm run start:dev
```

To build the system, run

```
npm run build
```

This command builds the client and the server and copies the built client files
to the client directory of the server.

Then you can start the system with

```
npm run start:dev
```

If you want to build the documentation, make sure that the server has been
started at least once before, because it generates the
`server/swagger-spec.json` file with Swagger. This file is needed to create the
description of the API.

Then you can build the documentation with

```
npm run docs:build
```

This command generates the documentation into the `/docs` folder. This way it
can be easily deployed with GitHub Pages.

## Base Url

By default the base Url is `/doatask`. To change it adapt the files `client/vite.config.js`
and `server/main.ts` and `server/app.module.ts`.

