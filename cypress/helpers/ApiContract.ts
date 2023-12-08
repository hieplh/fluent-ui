// TODO - autogenerate these
export interface authenticateResponse {
  readonly access_token: string;
  readonly token_type: string;
  readonly expires_in: number;
  readonly scope: string;
  readonly Roles: string[];
  readonly FirstName: string;
  readonly LastName: string;
  readonly Agent_id: number | undefined;
  readonly Retailer_id: number | undefined;
  readonly Location_id: number | undefined;
}

export interface getPluginStatusResponse {
  readonly accountId: string;
  readonly bundleName: string;
  readonly bundleStatus: string;
  readonly createOn: string;
  readonly deployedTime: string;
  readonly bundleVersion: string;
}

export interface updateWorkflowResponse {
  readonly entityId: string;
  readonly eventStatus: string;
}