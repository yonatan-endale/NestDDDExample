export class CreateRoleCommand {
  constructor(
    public readonly name: string,
    public readonly permissions: string[] = [],
    public readonly description?: string,
  ) {}
}
