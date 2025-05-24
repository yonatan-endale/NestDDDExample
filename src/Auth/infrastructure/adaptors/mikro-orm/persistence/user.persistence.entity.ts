// infrastructure/entities/aspnet-user.entity.ts
import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Role } from './roles.persistence.entity';

@Entity({ tableName: 'AspNetUsers', readonly: true })
export class User {
  @PrimaryKey()
  id!: string;
  @Property()
  firstName: string;
  @Property()
  lastName: string;
  @Property()
  email!: string;

  @ManyToMany(() => Role, (role) => role.users, {
    pivotTable: 'UserRoles', // join table name
  })
  roles = new Collection<Role>(this);
}
