# WebCodingChallenge

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

## Description

This application will allow a user use a sign up form

Once the sign up procedure is completed a post request will be made to
`https://demo-api.now.sh/users` containing the firstName, lastName and email fields.

```
{
  firstName: "Thomas",
  lastName: "Shelby",
  email: "thomas@shelby.co.uk"
}
```

The results of the request will be shown in json format on the screen.

If an error occurs the error will be logged to the console.

Signing up requires the user to enter a password that meets the following criteria:

- Should be a minimum of eight characters,
- Should contain lower and uppercase letters,
- Should not contain user’s first or last name.

## Minimum requirements

To run this application you are required to have at least Node v12 or higher installed.

## Installation

Using [npm](https://npmjs.org):

```sh
npm install
```

## Running the application

Run `npm start` to run the application.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io).
Or run `npm run test -- --watch` to execute the unit tests via [Jest](https://jestjs.io) in watch mode.

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).
Run `npm run e2e -- --watch` to execute the end-to-end tests via [Cypress](https://www.cypress.io) in watch mode.

