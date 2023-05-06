import {
  IUserAddApiRequest,
  IUserUpdateApiRequest,
} from "../../../models/dtos/user/user/user-api-models";
import { API_ENDPOINTS_CONST } from "../../../utils/constants/api-endpoints";
import http from "../../../utils/http";

export const getList = () => {
  return http.get(API_ENDPOINTS_CONST.getUserList);
};

export const getById = (id: number) => {
  return http.get(`${API_ENDPOINTS_CONST.getUserById}?id=${id}`);
};

export const deleteUser = (id: number) => {
  return http.delete(`${API_ENDPOINTS_CONST.deleteUser}/${id}`);
};

export const update = (user: IUserUpdateApiRequest) => {
  return http.patch(API_ENDPOINTS_CONST.updateUser, user);
};

export const add = (user: IUserUpdateApiRequest) => {
  return http.post(API_ENDPOINTS_CONST.addUser, user);
};
