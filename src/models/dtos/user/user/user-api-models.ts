export interface IUserApi {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  status: boolean;
}

export interface IUserApiResponse extends IUserApi {}

export interface IUserUpdateApiRequest extends IUserApi {
  password: string;
}

export interface IUserAddApiRequest extends IUserApi {
  password: string;
}
