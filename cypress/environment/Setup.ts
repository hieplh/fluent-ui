import * as api from '../helpers/ApiConnector';
import { TestData } from '../integration/Example.spec';
import { parseWorkflow } from '../helpers/ApiUtils';
import * as workflows from '../fixtures/workflows';

export const setupEnvironment = async ({
  environment,
  account,
  clientSecret,
  retailer,
}: TestData): Promise<Partial<TestData>> => {
  
  const endpoint = `https://${account}${environment !== 'production' ? '.' + environment : ''}.api.fluentretail.com`;

  // Authenticate as Retailer Admin
  const authRetailer = await api.authenticate(
    endpoint,
    account,
    clientSecret,
    retailer.username,
    retailer.password,
  );

  // Upload Workflows
  await Promise.all([
    api.uploadWorkflow(
      endpoint,
      parseWorkflow(
        workflows.ExampleWorkflow.default,
        '1.0',
        account,
        retailer.entityId,
      ),
      authRetailer.access_token,
    ),
  ]);

  // Configure Settings, Locations, Roles and anything else required for tests...

  return {
    retailer,
    // new skus, agents etc
  };
};
