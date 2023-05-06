export interface IRoleApi {
  id: number;
  name: string;
  displayName: string;
}

export interface IRoleApiResponse extends IRoleApi {}

export interface GetRoleByAuthGroupIdApiResponse {
  id: number;
  roleDisplayName: string;
}
