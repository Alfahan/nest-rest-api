export class Pagination {
    limit: number;
    offset: number;
  
    paginateQuery(): string {
      return ` LIMIT ${this.limit} OFFSET ${this.offset}`;
    }
  }
  