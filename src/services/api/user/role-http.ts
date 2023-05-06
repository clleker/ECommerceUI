import { IRoleOutPage } from "../../../pages/auth-group/page-models";
import { API_ENDPOINTS_CONST } from "../../../utils/constants/api-endpoints";
import http from "../../../utils/http";

export const getRolesByAuthGroupId = (authGroupId: number) => {
  const params = new URLSearchParams([["authGroupId", authGroupId.toString()]]);
  return http.get(API_ENDPOINTS_CONST.getRoleListByAuthGroupId, { params });
};

export const getListByPaging = (data: IRoleOutPage) => {
  return http.post(API_ENDPOINTS_CONST.getRoleListByPaging, data);
};
