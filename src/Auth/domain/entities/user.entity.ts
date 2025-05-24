import { Entity } from 'libs/shared-kernel/src';
import { Role } from './role.entity';

export class User extends Entity {
  private users: Set<User> = new Set();
  private roles: Set<Role> = new Set();
  constructor(
    public readonly id: string, // Same as AspNetUsers.Id
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly role: Role[] = [],
  ) {
    super(id);
  }
  getUsers(): User[] {
    return Array.from(this.users);
  }
  assignRole(role: Role): void {
    this.roles.add(role);
  }

  revokeRole(role: Role): void {
    this.roles.delete(role);
  }

  hasRole(roleName: string): boolean {
    return Array.from(this.roles).some((role) => role.name === roleName);
  }

  getRoles(): Role[] {
    return Array.from(this.roles);
  }
}
