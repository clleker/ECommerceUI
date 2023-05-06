export interface IAttributeGroupApi {
  id: number;
  title: string;
}

export interface IAttributeGroupAddRequest extends IAttributeGroupApi {}

export interface IAttributeGroupUpdateRequest extends IAttributeGroupApi {}

export interface IAttributeGroupResponse extends IAttributeGroupApi {}
