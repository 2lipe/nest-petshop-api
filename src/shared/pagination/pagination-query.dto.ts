export class PaginationQueryDto {
  constructor(
    public query: any,
    public fields: string,
    public keyword: string,
    public sort: string,
    public skip: number = 0,
    public take: number = 25,
  ) {}
}
