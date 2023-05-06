import { IBasePagingRequest } from "../../utils/paging/paging-request";

export interface IRoleOutPage extends IBasePagingRequest {}
export interface IRoleInPage extends IBasePagingRequest {}

export interface IAddOrUpdateDialogFlags {
  open: boolean;
  operationTitle: string;
  authGroupId: number;
}

export const initialModels = {
  addOrUpdateDialogFlags: {
    open: false,
    operationTitle: "EKLE",
    authGroupId: 0,
  },
};

export interface IAuthGroupForm {
  id: number;
  name: string;
  roleIds: number[];
}

//-----------------when authgroup was clicked-----------
export interface IRoleListPage {
  authGroupName: string;
  roleList: string[];
}
