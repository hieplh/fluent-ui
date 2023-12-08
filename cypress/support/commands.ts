// https://on.cypress.io/custom-commands

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      login(username: string, password: string): void;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('input[type=text]').type(username);
  cy.get('input[type=password]').type(password);
  cy.get('form:first').submit();
});

export {}; // Convert this to a module so Cypress can be defined globally
