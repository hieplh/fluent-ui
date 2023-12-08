/**
 * @member {string} environment points Cypress to the correct API endpoint
 * @member {string} account is the user's account Cypress should use
 * @member {string} clientSecret is the clientSecret string used for authentication
 * @member {string} accountAdminUsername is the username for a user which has elevated permissions
 * @member {string} accountAdminPassword is the password for a user which has elevated permissions
*/
export interface CypressEnv {
  environment: 'test' | 'staging' | 'sandbox' | 'production';
  account: string;
  clientSecret: string;
  accountAdminUsername: string;
  accountAdminPassword: string;
  retailer: User;
  agent: User;
}

export interface User {
  entityId: number
  username: string
  password: string
}
