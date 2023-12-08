import { CypressEnv } from './../Cypress';
import { setupEnvironment } from './../environment/Setup';

/**
 * @type {Cypress.PluginConfig}
 * https://docs.cypress.io/api/plugins/writing-a-plugin#config
 */
export default function (on: any, config: any) {
  // require('cypress-mochawesome-reporter/plugin')(on);
  
  const env: CypressEnv = config.env;

  on('task', {
    async setupEnvironment() {
      if (!env.agent) {
        return await setupEnvironment(config.env);
      } else {
        console.log('Using agent ', env.agent);
      }
      return null;
    },
  });
}
