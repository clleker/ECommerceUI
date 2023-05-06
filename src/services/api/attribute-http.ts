import {
  IAttributeAddRequest,
  IAttributeUpdateRequest,
} from "../../models/dtos/attribute/attribute-models";
import { API_ENDPOINTS_CONST } from "../../utils/constants/api-endpoints";
import http from "../../utils/http";

export const add = (request: IAttributeAddRequest) => {
  return http.post(API_ENDPOINTS_CONST.addAttribute, request);
};

export const getList = () => {
  return http.get(API_ENDPOINTS_CONST.getAttributeList);
};

export const getById = (id: number) => {
  return http.get(`${API_ENDPOINTS_CONST.getByAttributeId}?id=${id}`);
};

export const update = (attribute: IAttributeUpdateRequest) => {
  return http.patch(API_ENDPOINTS_CONST.updateAttribute, attribute);
};

export const deleteAttribute = (id: number) => {
  return http.delete(`${API_ENDPOINTS_CONST.deleteAttribute}/${id}`);
};
