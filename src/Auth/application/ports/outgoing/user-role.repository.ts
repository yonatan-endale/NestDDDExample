import { Role } from 'src/Auth/domain/entities/role.entity';
import { User } from 'src/Auth/domain/entities/user.entity';

export abstract class TUserRoleRepository {
  abstract findUserRoles(id: string): Promise<Role[]>;
  abstract saveUserRoles(id: string, role: string): Promise<boolean>;
  abstract updateUserRoles(id: string, roles: Role[]): Promise<boolean>;
  abstract hasRole(id: string, roleId: string): Promise<boolean>;
  abstract deleteUserRoles(id: string, roleId: string): Promise<void>;
  abstract findRoleUsers(id: string): Promise<User[]>;
}
