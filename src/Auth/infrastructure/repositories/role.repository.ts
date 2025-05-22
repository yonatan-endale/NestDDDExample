import { EntityRepository } from '@mikro-orm/core';
import { Role } from '../../domain/entities/role.entity';
import { RoleRepositoryPort } from '../../application/ports/outgoing/role.repository';

export class RoleRepository implements RoleRepositoryPort {
  constructor(private readonly repo: EntityRepository<Role>) {}
  findUserRoles(id: string): Promise<Role[]> {
    throw new Error('Method not implemented.');
  }
  findPermissions(id: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  saveUserRoles(id: string, roles: Role[] | Role): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public findById(id: string): Promise<Role | null> {
    return this.repo.findOne(id);
  }
  public save(role: Role): Promise<Role | null> {
    try {
      const r = this.repo.create(role);
      return r;
    } catch (error) {
      console.error('Error creating role:', error);
      return null;
    }
  }
}
