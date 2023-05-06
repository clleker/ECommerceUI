import { config } from "process";
import { ProductCardAddRequest } from "../../models/dtos/product-card/product-card-api-models";
import { IProductOutPage } from "../../pages/product/page-models";
import { API_ENDPOINTS_CONST } from "../../utils/constants/api-endpoints";
import http from "../../utils/http";

export const Add = (request: ProductCardAddRequest) => {
  return http.post(API_ENDPOINTS_CONST.addProductCard, request);
};

export const getListProductByPaging = (request: IProductOutPage) => {
  return http.post(API_ENDPOINTS_CONST.getExtendedProductCardList, request);
};
