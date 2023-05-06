export interface IAddOrUpdateCategoryDialogFlags {
  categoryModalVisible: boolean;
  operationTitle: string;
  categoryId: number;
}

export const initialModels = {
  addOrUpdateDialogFlags: {
    categoryModalVisible: false,
    operationTitle: "EKLE",
    categoryId: 0,
  },
};

export interface ICategoryPage {
  id: number;
  name: string;
  slug: string;
  description: string;
  metaKeywords: string;
  metaDescription: string;
  metaTitle: string;
  iconImage: any;
  parentCategoryId?: number;
  parentCategoryName: string;
}
