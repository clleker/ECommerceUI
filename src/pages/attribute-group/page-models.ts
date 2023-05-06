export interface IAddOrUpdateDialogFlags {
  attributeGroupModalVisible: boolean;
  operationTitle: string;
  attributeGroupId: number;
}

export const initialModels = {
  addOrUpdateDialogFlags: {
    attributeGroupModalVisible: false,
    operationTitle: "EKLE",
    attributeGroupId: 0,
  },
};

export interface AttributeGroupPage {
  id: number;
  title: string;
}
