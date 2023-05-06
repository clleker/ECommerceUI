import { IUserApi } from "../user/user-api-models";

export interface ILoginApi {
  email: string;
  password: string;
}

export interface ILoginApiRequest extends ILoginApi {}
