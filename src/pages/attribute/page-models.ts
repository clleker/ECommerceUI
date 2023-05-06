export interface IAddOrUpdateDialogFlags {
  attributeModalVisible: boolean;
  operationTitle: string;
  attributeId: number;
}

export const initialModels = {
  addOrUpdateDialogFlags: {
    attributeModalVisible: false,
    operationTitle: "EKLE",
    attributeId: 0,
  },
};

export interface IAttributePage {
  id: number;
  name: string;
  description: string;
}
