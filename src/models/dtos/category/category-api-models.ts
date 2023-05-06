export interface ICategoryApi {
  id: number;
  name: string;
  slug: string;
  description: string;
  metaKeywords: string;
  metaDescription: string;
  metaTitle: string;
  parentCategoryId?: number;
}

export interface ICategoryAddRequest extends ICategoryApi {
  iconImage: any;
}

export interface ICategoryUpdateRequest extends ICategoryApi {
  iconImage: any;
}

export interface ICategoryResponse extends ICategoryApi {
  parentCategoryName: string;
  urlImage: string;
}
