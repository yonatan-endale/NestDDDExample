import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Role as RoleEntity } from './roles.persistence.entity';
import { User as UserEntity } from './user.persistence.entity';

@Entity({ tableName: 'UserRoles' })
export class UserRoleEntity {
  @ManyToOne(() => UserEntity, { primary: true })
  user!: UserEntity;

  @ManyToOne(() => RoleEntity, { primary: true })
  role!: RoleEntity;

  @Property()
  assignedAt = new Date();
}
