import { AttributeGroupPage } from "../../../pages/attribute-group/page-models";
import {
  IAttributeGroupAddRequest,
  IAttributeGroupResponse,
  IAttributeGroupUpdateRequest,
} from "./attribute-group-api-models";

//#region   UI --> Api
export const addAttributeGroupMappingForApi = (
  input: AttributeGroupPage
): IAttributeGroupAddRequest => {
  const output: IAttributeGroupAddRequest = {
    id: input.id,
    title: input.title,
  };
  return output;
};

export const updateAttributeGroupMappingForApi = (
  input: AttributeGroupPage
): IAttributeGroupUpdateRequest => {
  const output: IAttributeGroupUpdateRequest = {
    id: input.id,
    title: input.title,
  };
  return output;
};
//#endregion

//#region   Api --> UI
export function mappingForPage(
  input: IAttributeGroupResponse | IAttributeGroupResponse[]
): any {
  if (Array.isArray(input)) {
    return input.map((x): AttributeGroupPage => ({ id: x.id, title: x.title }));
  } else {
    //
    return {
      id: input.id,
      title: input.title,
    };
  }
}
//#endregion
