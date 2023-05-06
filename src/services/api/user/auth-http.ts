import { ILoginApiRequest } from "../../../models/dtos/user/auth/auth-api-models";
import { API_ENDPOINTS_CONST } from "../../../utils/constants/api-endpoints";
import http from "../../../utils/http";

export const login = (userForLogin: ILoginApiRequest) => {
  return http.post(API_ENDPOINTS_CONST.login, userForLogin);
};
