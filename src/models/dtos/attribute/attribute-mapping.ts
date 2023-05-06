import { IAttributePage } from "../../../pages/attribute/page-models";
import {
  IAttributeAddRequest,
  IAttributeResponse,
  IAttributeUpdateRequest,
} from "./attribute-models";

//#region   UI --> Api
export const addAttributeMappingForApi = (
  input: IAttributePage
): IAttributeAddRequest => {
  const output: IAttributeUpdateRequest = {
    id: input.id,
    name: input.name,
    description: input.description,
  };
  return output;
};

export const updateAttributeMappingForApi = (
  input: IAttributePage
): IAttributeUpdateRequest => {
  const output: IAttributeUpdateRequest = {
    id: input.id,
    name: input.name,
    description: input.description,
  };
  return output;
};
//#endregion

//#region   Api --> UI
export function mappingForPage(
  input: IAttributeResponse | IAttributeResponse[]
): any {
  if (Array.isArray(input)) {
    return input.map(
      (x): IAttributePage => ({
        id: x.id,
        name: x.name,
        description: x.description,
      })
    );
  } else {
    //
    return {
      id: input.id,
      name: input.name,
      description: input.description,
    };
  }
}
//#endregion
