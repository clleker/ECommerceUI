export interface IAttributeApi {
  id: number;
  name: string;
  description: string;
}

export interface IAttributeAddRequest extends IAttributeApi {}
export interface IAttributeUpdateRequest extends IAttributeApi {}
export interface IAttributeResponse extends IAttributeApi {}
