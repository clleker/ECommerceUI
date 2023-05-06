//

export interface IBasePagingRequest {
  pageIndex: number;
  pageSize: number;
  search: string;
}

export interface IPagingRequest extends IBasePagingRequest {
  orders: IOrderFilter[];
}

interface IOrderFilter {
  columnName: string;
  directionDesc: boolean;
}

export class InitialPagedFilter implements IPagingRequest {
  orders: IOrderFilter[];
  pageIndex: number;
  pageSize: number;
  search: string;

  constructor(columnName: string, directionDesc: "asc" | "desc") {
    this.search = "";
    this.pageIndex = 0;
    this.pageSize = 50;

    this.orders = [
      {
        directionDesc: directionDesc == "asc" ? false : true,
        columnName: columnName.toString(),
      },
    ];
  }
}
