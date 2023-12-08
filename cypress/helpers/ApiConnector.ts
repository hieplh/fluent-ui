import * as fluentApi from './ApiContract';
const axios = require('axios').default;

export const authenticate = async (
  endpoint: string,
  account: string,
  clientSecret: string,
  username: string,
  password: string,
): Promise<fluentApi.authenticateResponse> => {
  console.log(`Authenticating as ${username}...`);
  const response = await axios.post(
    `${endpoint}/oauth/token?client_id=${account}&client_secret=${clientSecret}&username=${username}&password=${password}&grant_type=password&scope=api`,
  );
  console.log('Response: authenticate() -> ', response.status, response.data);
  return response.data;
};

export const getPluginStatus = async (
  endpoint: string,
  accessToken: string,
  pluginName: string,
): Promise<fluentApi.getPluginStatusResponse> => {
  console.log(`Retrieving plugin status for ${pluginName}...`);
  const response = await axios.get(`${endpoint}/orchestration/rest/v1/plugin/${pluginName}/status`, {
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}`},
  });
  console.log('Response: getPluginStatus() -> ', response.status, response.data);
  return response.data;
};

export const uploadWorkflow = async (
  host: string,
  workflow: any,
  accessToken: string,
): Promise<fluentApi.updateWorkflowResponse> => {
  console.log(`Uploading Workflow ${workflow.entityType}::${workflow.entitySubtype}...`);
  try {
    // Using PUT as POST doesn't validate Workflows against available Rules
    const response: any = await axios.put(`${host}/api/v4.1/workflow`, workflow, {
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}`},
    });
    console.log('Response: uploadWorkflow() -> ', response.status, response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error -> ', JSON.stringify(error.response.data));
    throw error;
  }
};