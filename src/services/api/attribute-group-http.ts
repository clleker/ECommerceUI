import {
  IAttributeGroupAddRequest,
  IAttributeGroupUpdateRequest,
} from "../../models/dtos/attribute-group/attribute-group-api-models";
import { API_ENDPOINTS_CONST } from "../../utils/constants/api-endpoints";
import http from "../../utils/http";

export const add = (attributeGroup: IAttributeGroupAddRequest) => {
  return http.post(API_ENDPOINTS_CONST.addAttributeGroup, attributeGroup);
};

export const getList = () => {
  return http.get(API_ENDPOINTS_CONST.getAttributeGroupList);
};

export const getById = (id: number) => {
  return http.get(`${API_ENDPOINTS_CONST.getByAttributeGroupId}?id=${id}`);
};

export const update = (attributeGroup: IAttributeGroupUpdateRequest) => {
  return http.patch(API_ENDPOINTS_CONST.updateAttributeGroup, attributeGroup);
};

export const deleteAttribute = (id: number) => {
  return http.delete(`${API_ENDPOINTS_CONST.deleteAttributeGroup}/${id}`);
};
