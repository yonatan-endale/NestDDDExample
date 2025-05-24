import { Role } from 'src/Auth/domain/entities/role.entity';

export abstract class TRoleRepository {
  abstract findPermissions(id: string): Promise<string[]>;
  abstract createRole(role: Role): Role;
  abstract updateRole(role: Role): Promise<Role | null>;
  abstract deleteRole(id: string): Promise<boolean>;
  abstract findRole(id: string): Promise<Role | null>;
  abstract findAllRoles(): Promise<Role[]>;
  abstract findRoleByName(name: string): Promise<Role | null>;
  abstract findRoleById(id: string): Promise<Role | null>;
}
