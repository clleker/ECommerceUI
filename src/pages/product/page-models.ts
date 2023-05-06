import { IProductApiResponse } from "../../models/dtos/product-card/product-card-api-models";
import { IPagingRequest } from "../../utils/paging/paging-request";
import { IPagingResponse } from "../../utils/paging/paging-response";

export interface IAddOrUpdatePictureDialog {
  open: boolean;
  operationTitle: string;
  productCardId: number;
}

//#endregion

//#region  Product
export interface IProductOutPage extends IPagingRequest {}
export interface IProductInPage extends IPagingResponse<IProductApiResponse> {}

//#endregion

//#region Product Add
//------------Main models----------------------
export interface IProductCard {
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  productDetail: string;
  additionalInfo: string;
  productAttributeGroups: IProductAttributeGroupPage[];
  categoryIds: number[];
}

export interface IProductAttributeGroupPage {
  attributeGroupId: number;
  name: string;
  productCardAttributes: IProductCardAttributeAndPrice[];
}

export interface IProductCardAttributeAndPrice {
  key: number;
  attributeId: number;
  parent?: { id: number; name: string };
  name: string;
  salesPrice: number;
  sku: string;
  barcode: string;
  includingVatPrice: number;
}

export const initialProductCard = {
  id: 0,
  name: "",
  shortDescription: "",
  longDescription: "",
  productDetail: "",
  additionalInfo: "",
  productAttributeGroups: [],
  categoryIds: [],
};

//pages of product-card file consume models of here
export const initialModels = {
  addOrUpdateDialogFlags: {
    attributeModalVisible: false,
    operationTitle: "EKLE",
    attributeId: 0,
  },
  //----------------PICTURE---------------
  addOrUpdatePictureDialog: {
    open: false,
    productCardId: 0,
    operationTitle: "EKLE",
  },
};
//#endregion

//# Picture Add

export interface IPicturePage {
  productCardId: number;
  pictures: any[];
}
