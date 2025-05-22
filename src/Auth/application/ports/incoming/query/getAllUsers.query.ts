export class GetAllUserQuery {
  constructor(
    public readonly searchString: string,
    public readonly perPage: number,
    public readonly currentPage: number,
  ) {}
}
