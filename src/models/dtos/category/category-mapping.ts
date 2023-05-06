import { ICategoryPage } from "../../../pages/category/page-models";
import { convertObjToFormData } from "../../../utils/common-utils";
import {
  ICategoryAddRequest,
  ICategoryResponse,
  ICategoryUpdateRequest,
} from "./category-api-models";

//#region   UI --> Api
export const addCategoryMappingForApi = (input: ICategoryPage): FormData => {
  const output: ICategoryAddRequest = {
    id: input.id,
    name: input.name,
    slug: input.slug,
    description: input.description,
    metaKeywords: input.metaKeywords,
    metaDescription: input.metaDescription,
    metaTitle: input.metaTitle,
    iconImage: input.iconImage[0].originFileObj,
    parentCategoryId: input.parentCategoryId,
  };

  return convertObjToFormData(output, new FormData());
};

export const updateCategoryMappingForApi = (
  input: ICategoryPage
): ICategoryUpdateRequest => {
  const output: ICategoryUpdateRequest = {
    id: input.id,
    name: input.name,
    slug: input.slug,
    description: input.description,
    metaKeywords: input.metaKeywords,
    metaDescription: input.metaDescription,
    metaTitle: input.metaTitle,
    iconImage: input.iconImage,
    parentCategoryId: input.parentCategoryId,
  };
  return output;
};
//#endregion

export function mappingForPage(
  input: ICategoryResponse | ICategoryResponse[]
): any {
  if (Array.isArray(input)) {
    return input.map(
      (x): ICategoryPage => ({
        id: x.id,
        name: x.name,
        slug: x.slug,
        description: x.description,
        metaKeywords: x.metaKeywords,
        metaDescription: x.metaDescription,
        metaTitle: x.metaTitle,
        iconImage: x.urlImage,
        parentCategoryId: x.parentCategoryId,
        parentCategoryName: x.parentCategoryName,
      })
    );
  }
}
