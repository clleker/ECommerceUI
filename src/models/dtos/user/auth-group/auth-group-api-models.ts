export interface IAuthGroupApi {
  authGroupId: number;
  name: string;
}

export interface IAuthGroupApiResponse extends IAuthGroupApi {}

export interface AuthGroupAddApiRequest {
  name: string;
  roleIds: number[];
}
export interface AuthGroupUpdateApiRequest extends IAuthGroupApi {
  roleIds: number[];
}
