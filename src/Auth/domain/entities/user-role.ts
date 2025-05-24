export class UserRole {
  constructor(
    public readonly userId: string,
    public readonly roleId: string,
    public readonly assignedAt: Date,
  ) {}
}
