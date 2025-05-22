import { User } from '../../domain/entities/user.entity';
import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';

@Entity({ tableName: 'roles' })
export class Role {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ type: 'text' })
  permissions: string[] = [];

  @ManyToMany(() => User, (user) => user.roles)
  users = new Collection<User>(this);
}
