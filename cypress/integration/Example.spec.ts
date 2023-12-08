import { CypressEnv } from '../Cypress';

export interface TestData extends CypressEnv {
  retailer: any;
  agent: any;
}

describe('Plugin', () => {
  let testData = <TestData>Cypress.env();

  before(function () {
    cy.task('setupEnvironment', null, { timeout: 1800000 })
      .then((newData: any) => {
        testData = { ...testData, ...newData };
      })
      .visit(`/`);
  });

  it('Successfully logs in', () => {
    cy.visit('store');
    cy.login(testData.agent.username, testData.agent.password);
    cy.screenshot('Demo');
  });
});
