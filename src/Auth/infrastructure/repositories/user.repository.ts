import { EntityRepository } from '@mikro-orm/core';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../application/ports/outgoing/user.repository';

export class MikroUserRepository implements UserRepositoryPort {
  constructor(private readonly repo: EntityRepository<User>) {}

  findById(id: string) {
    return this.repo.findOneOrFail({ id });
  }
  findUserRoles(id: string) {
    return this.repo.findOneOrFail({ id }, { populate: ['roles'] });
  }
}
