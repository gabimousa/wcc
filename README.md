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

## Installation

Using [npm](https://npmjs.org):

```sh
npm install
```

## Running the application

Run `ng serve` to run the application.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
