import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '../persistence/user.persistence.entity';
import { TUserRepository } from '../../../../application/ports/outgoing/user.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { AspNetUserMapper } from '../mappers/user.mapper';
import { User } from '../../../../domain/entities/index';

@Injectable()
export class MikroUserRepository extends TUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: EntityRepository<UserEntity>,
  ) {
    super();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.repo.findOneOrFail({ id });
    return AspNetUserMapper.toDomain(user);
  }
  async findUserByFirstName(firstName: string): Promise<User> {
    const user = await this.repo.findOneOrFail({ firstName });
    return AspNetUserMapper.toDomain(user as unknown as UserEntity);
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.repo.findAll();
    return users.map((user) => AspNetUserMapper.toDomain(user));
  }
  findUserRoles(id: string) {
    return this.repo.findOneOrFail({ id }, { populate: ['roles'] });
  }
}
