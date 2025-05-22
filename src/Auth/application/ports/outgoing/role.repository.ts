import { Role } from 'src/Auth/domain/entities/role.entity';

export abstract class TRoleRepository {
  abstract findPermissions(id: string): Promise<string[]>;
  abstract createRole(
    name: string,
    permissions: string[],
    description?: string,
  ): Promise<void>;
  abstract updateRole(
    id: string,
    name: string,
    permissions: string[],
    description?: string,
  ): Promise<boolean>;
  abstract deleteRole(id: string): Promise<void>;
  abstract findRole(id: string): Promise<Role>;
  abstract findAllRoles(): Promise<Role[]>;
  abstract findRoleByName(name: string): Promise<Role>;
  abstract findRoleById(id: string): Promise<Role>;
}
