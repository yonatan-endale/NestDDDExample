import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Role as RoleEntity } from '../persistence/roles.persistence.entity';
import { Role } from '../../../../domain/entities/index';
import { TRoleRepository } from '../../../../application/ports/outgoing/role.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RoleMapper } from '../mappers/role.mapper';

@Injectable()
export class MikroOrmRoleRepository extends TRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repo: EntityRepository<RoleEntity>,
  ) {
    super();
  }

  async findPermissions(id: string): Promise<string[]> {
    const role = await this.repo.findOneOrFail({ id });
    return role.permissions;
  }

  createRole(role: Role): Role {
    const entity = RoleMapper.toEntity(role);
    const rol = this.repo.create(entity);
    return RoleMapper.toDomain(rol);
  }

  async updateRole(updaterole: Role): Promise<Role | null> {
    const id = updaterole.id;
    const role = await this.repo.findOne({ id });
    if (!role) return role;
    role.name = updaterole.name;
    role.permissions = updaterole.permissions;
    role.updatedBy = updaterole.updatedBy;
    role.description = updaterole.description;
    role.updatedAt = new Date();
    const rep = await this.repo.upsert(role);
    const domainRole = RoleMapper.toDomain(rep);
    return domainRole;
  }

  async deleteRole(id: string): Promise<boolean> {
    const role = await this.repo.findOneOrFail({ id });
    const del = await this.repo.nativeDelete(role);
    if (del) return true;
    return false;
  }

  async findRole(id: string): Promise<Role> {
    const role = await this.repo.findOneOrFail({ id });
    return RoleMapper.toDomain(role);
  }

  async findRoleById(id: string): Promise<Role> {
    return this.findRole(id);
  }

  async findRoleByName(name: string): Promise<Role> {
    const role = await this.repo.findOneOrFail({ name });
    return RoleMapper.toDomain(role);
  }

  async findAllRoles(): Promise<Role[]> {
    const roles = await this.repo.findAll();
    return roles.map((role) => RoleMapper.toDomain(role));
  }
}
