export interface IAddOrUpdateDialogFlags {
  open: boolean;
  operationTitle: string;
  userId: number;
}

export const initialModels = {
  addOrUpdateDialogFlags: {
    open: false,
    operationTitle: "EKLE",
    userId: 0,
  },
};
