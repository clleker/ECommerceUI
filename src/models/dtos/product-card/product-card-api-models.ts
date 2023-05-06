export interface ProductCardAddRequest {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  productDetail: string;
  additionalInfo: string;
  categoryIds: number[];
  productAttributeGroups: ProductCardAttributesGroupSubAddRequest[];
}

export interface ProductCardAttributesGroupSubAddRequest {
  productId: number;
  attributeGroupId: number;
  productCardAttributes: ProductCardAttributesSubAddRequest[];
}

export interface ProductCardAttributesSubAddRequest {
  attributeId: number;
  productAttributeGroupId: number;
  parentId?: number;
  productCardItem: ProductCardItemSubAddRequest;
}

export interface ProductCardItemSubAddRequest {
  sku: string;
  barcode: string;
  productCardPrice: ProductCardPriceSubAddRequest;
}

export interface ProductCardPriceSubAddRequest {
  salesPrice: number;
  includingVatPrice: number;
  purePrice: number;
  productCost: number;
}

//------------------------------------------------PRODUCT ----------------------------------------------
export interface IProductApiResponse {
  productCardId: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  productDetail: string;
  additionalInfo: string;
  sku: string;
  barcode: string;
  salesPrice: number;
  categories: ICategoryListSubApiResponse[];
}

export interface ICategoryListSubApiResponse {
  categoryId: number;
  categoryName: string;
}

//-----------------------------------------PRODUCT PICTURE---------------------------------------------

export interface IProductPictureAddRequest {
  productCardId: number;
  pictures: any;
}
