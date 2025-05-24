export class QueryDto {
  page_number?: number;
  size?: number;
  filter?: Record<string, any>;
  orderBy?: string;
  ascending?: boolean;

  constructor(
    page_number?: number,
    size?: number,
    filter?: Record<string, any>,
    ascending?: boolean,
    orderBy?: string,
  ) {
    this.page_number = page_number;
    this.size = size;
    this.filter = filter;
    this.ascending = ascending;
    this.orderBy = orderBy;
  }
}
