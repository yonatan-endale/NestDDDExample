// roles/ports/commands/create-role.command.ts

export class GetAllRolesQuery {
  constructor(
    public readonly searchString?: string,
    public readonly perPage?: number,
    public readonly currentPage?: number,
  ) {}
}
