import { config } from "process";
import {
  IProductPictureAddRequest,
  ProductCardAddRequest,
} from "../../models/dtos/product-card/product-card-api-models";
import { IProductOutPage } from "../../pages/product/page-models";
import {
  API_ENDPOINTS_CONST,
  uploadType,
} from "../../utils/constants/api-endpoints";
import http from "../../utils/http";

export const getListByProductCardId = (productCardId: number) => {
  const params = new URLSearchParams([
    ["productCardId", productCardId.toString()],
  ]);

  return http.get(API_ENDPOINTS_CONST.getProductCardPictureList, { params });
};

export const addPicturesToProduct = (request: FormData) => {
  return http.post(
    API_ENDPOINTS_CONST.addPicturesToProduct,
    request,
    uploadType
  );
};
