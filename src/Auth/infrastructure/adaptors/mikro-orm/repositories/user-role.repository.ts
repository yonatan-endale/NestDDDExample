import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';

import { User as UserEntity } from '../persistence/user.persistence.entity';
import { Role as RoleEntity } from '../persistence/roles.persistence.entity';
import { UserRoleEntity } from '../persistence/user-role.persistence.entity';

import { TUserRoleRepository } from '../../../../application/ports/outgoing/user-role.repository';
import { Role, User } from '../../../../domain/entities/index';
import { AspNetUserMapper } from '../mappers/user.mapper';
import { RoleMapper } from '../mappers/role.mapper';

@Injectable()
export class MikroUserRoleRepository implements TUserRoleRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: EntityRepository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepo: EntityRepository<RoleEntity>,

    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepo: EntityRepository<UserRoleEntity>,
  ) {}

  async findUserRoles(userId: string): Promise<Role[]> {
    const user = await this.userRepo.findOneOrFail(
      { id: userId },
      { populate: ['roles'] },
    );
    return user.roles.getItems().map((role) => RoleMapper.toDomain(role));
  }

  async create(userId: string, roleId: string): Promise<UserRoleEntity> {
    const user = await this.userRepo.findOneOrFail({ id: userId });
    const role = await this.roleRepo.findOneOrFail({ id: roleId });

    const existing = await this.userRoleRepo.findOne({ user, role });
    if (existing) return existing; //if it exists it will return the existing entity

    const userRole = new UserRoleEntity();
    userRole.user = user;
    userRole.role = role;
    const newUserRole = await this.userRoleRepo.upsert(userRole); //create method is really weird! this creates the table if it doesn't exist.
    return newUserRole; //after creating it will return the new user role entity
  }

  async update(userId: string, roleId: string): Promise<boolean> {
    const user = await this.userRepo.findOneOrFail({ id: userId });
    if (!user) throw new Error('User not found');
    const role = await this.roleRepo.findOneOrFail({ id: roleId });
    if (!role) throw new Error('User not found');

    const userRole = await this.userRoleRepo.findOneOrFail({
      user: user,
      role: role,
    });
    if (userRole) {
      await this.userRoleRepo.nativeDelete(userRole);
    }

    return true;
  }

  async hasRole(userId: string, roleId: string): Promise<boolean> {
    const count = await this.userRoleRepo.count({
      user: userId,
      role: roleId,
    });
    return count > 0;
  }

  async deleteUserRoles(userId: string, roleId: string): Promise<boolean> {
    const user = await this.userRepo.findOneOrFail({ id: userId });
    const role = await this.roleRepo.findOneOrFail({ id: roleId });

    const userRole = await this.userRoleRepo.findOne({ user, role });
    if (userRole) {
      await this.userRoleRepo.nativeDelete(userRole);
      return true;
    }
    return false;
  }

  async findRoleUsers(roleId: string): Promise<User[]> {
    const role = await this.roleRepo.findOneOrFail(
      { id: roleId },
      { populate: ['users'] },
    );
    return role.users.getItems().map(AspNetUserMapper.toDomain);
  }
}
