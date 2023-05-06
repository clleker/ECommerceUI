import { AuthGroupAddApiRequest } from "../../../models/dtos/user/auth-group/auth-group-api-models";
import { API_ENDPOINTS_CONST } from "../../../utils/constants/api-endpoints";
import http from "../../../utils/http";

export const getList = () => {
  return http.get(API_ENDPOINTS_CONST.getAuthGroupList);
};

export const addWithRoles = (authGroup: AuthGroupAddApiRequest) => {
  return http.post(API_ENDPOINTS_CONST.addAuthGroupWithRoles, authGroup);
};
