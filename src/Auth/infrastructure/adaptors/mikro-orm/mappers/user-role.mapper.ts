import { UserRole } from '../../../../domain/entities/index';
import { UserRoleEntity as OrmUserRole } from '../persistence/user-role.persistence.entity';

export class UserRoleMapper {
  static toDomain(ormEntity: OrmUserRole): UserRole {
    return new UserRole(
      ormEntity.user.id,
      ormEntity.role.id,
      ormEntity.assignedAt,
    );
  }

  static toOrmEntity(domainEntity: UserRole): OrmUserRole {
    const ormEntity = new OrmUserRole();
    ormEntity.user.id = domainEntity.userId;
    ormEntity.role.id = domainEntity.roleId;
    ormEntity.assignedAt = domainEntity.assignedAt;

    return ormEntity;
  }
}
