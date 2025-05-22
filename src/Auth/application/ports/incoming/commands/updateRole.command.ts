export class UpdateRoleCommand {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly permissions: string[],
    public readonly description?: string,
  ) {}
}
