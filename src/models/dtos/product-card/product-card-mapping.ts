import {
  IProductPictureAddRequest,
  ProductCardAddRequest,
} from "./product-card-api-models";
import { IPicturePage, IProductCard } from "../../../pages/product/page-models";

export const addProductCardForApiMapping = (input: IProductCard): any => {
  const output: ProductCardAddRequest = {
    id: input.id,
    name: input.name,
    longDescription: input.longDescription,
    additionalInfo: input.additionalInfo,
    productDetail: input.productDetail,
    shortDescription: input.shortDescription,
    categoryIds: input.categoryIds,
    productAttributeGroups: input.productAttributeGroups.map((x) => ({
      productId: 0,
      attributeGroupId: x.attributeGroupId,
      productCardAttributes: x.productCardAttributes.map((y) => ({
        productAttributeGroupId: 0,
        attributeId: y.attributeId,
        parentId: y.parent?.id ?? 0,
        productCardItem: {
          sku: y.sku,
          barcode: y.barcode,
          productCardPrice: {
            salesPrice: y.salesPrice,
            includingVatPrice: y.includingVatPrice,
            purePrice: 0,
            productCost: 0,
          },
        },
      })),
    })),
  };

  return output;
};

export const addPictureToProductCardForApiMapping = (
  input: IPicturePage
): FormData => {
  const output: IProductPictureAddRequest = {
    productCardId: input.productCardId,
    pictures: input.pictures.map((x) => x.originFileObj),
  };
  const formData = new FormData();
  formData.append("productCardId", output.productCardId.toString());

  output.pictures.forEach((file: any) => {
    formData.append("pictures", file);
  });

  return formData;
};
