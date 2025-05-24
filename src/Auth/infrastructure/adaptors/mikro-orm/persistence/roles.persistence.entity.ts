import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { User } from './user.persistence.entity';

@Entity({ tableName: 'roles' })
export class Role {
  @PrimaryKey('uuid')
  id!: string;

  @Property()
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ type: 'text' })
  permissions: string[] = [];

  @Property()
  updatedAt: Date;

  @Property()
  createdAt: Date;

  @Property()
  createdBy: string;

  @Property()
  updatedBy: string;

  @ManyToMany(() => User, (user) => user.roles)
  users = new Collection<User>(this);
}
