import { Role as RoleDomain } from 'src/Auth/domain/entities';
import { Role as RoleEntity } from '../persistence/roles.persistence.entity';
export class RoleMapper {
  static toDomain(role: RoleEntity): RoleDomain {
    return new RoleDomain(
      role.id,
      role.name,
      role.permissions,
      role.updatedAt,
      role.createdAt,
      role.createdBy,
      role.updatedBy,
      role.description,
    );
  }
  static toEntity(role: RoleDomain): RoleEntity {
    const entity = new RoleEntity();
    entity.id = role.id;
    entity.name = role.name;
    entity.permissions = role.permissions;
    entity.updatedAt = role.updatedAt;
    entity.createdAt = role.createdAt;
    entity.createdBy = role.createdBy;
    entity.updatedBy = role.updatedBy;
    entity.description = role.description;
    return entity;
  }
}
