export interface IPagingResponse<T> {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  indexFrom: number;
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export const initialPagingList: any = {
  hasNextPage: null,
  hasPreviousPage: null,
  items: [],
  indexFrom: 0,
  pageIndex: 0,
  pageSize: 0,
  totalCount: 0,
  totalPages: 0,
};
