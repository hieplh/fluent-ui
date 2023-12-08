# Cypress Integration Tests

## Running Cypress locally

**Configuring environment variables**

Cypress requires an environment configuration to run the tests. 
Create a `cypress.env.json` file in the root of the project and populate it with the fields described in the cypress/Cypress.ts interface, e.g.

```json
{
    "environment": "test",
    "account": "MYSTQA",
    "clientSecret": "12345678-abcd-1234-1234-123456789abc",
    "accountAdminUsername": "account_admin",
    "accountAdminPassword": "pAsSwoRd",
    "agent": {
        "locationRef": "12345"
    }
}
```

**Running the tests**

```bash
yarn run e2e # Uses baseUrl defined in cypress.json
yarn run e2e --config baseUrl=https://[account].staging.apps.fluentcommerce.com # Overrides baseUrl
```

