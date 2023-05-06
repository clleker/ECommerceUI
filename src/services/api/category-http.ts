import {
  ICategoryAddRequest,
  ICategoryUpdateRequest,
} from "../../models/dtos/category/category-api-models";
import {
  API_ENDPOINTS_CONST,
  uploadType,
} from "../../utils/constants/api-endpoints";
import http from "../../utils/http";

export const add = (category: FormData) => {
  return http.post(API_ENDPOINTS_CONST.addCategory, category, uploadType);
};

export const getList = () => {
  return http.get(API_ENDPOINTS_CONST.getCategoryList);
};

export const getById = (id: number) => {
  return http.get(`${API_ENDPOINTS_CONST.getByCategoryId}?id=${id}`);
};

export const update = (category: ICategoryUpdateRequest) => {
  return http.patch(API_ENDPOINTS_CONST.updateCategory, category);
};

export const deleteCategory = (id: number) => {
  return http.delete(`${API_ENDPOINTS_CONST.deleteCategory}/${id}`);
};
