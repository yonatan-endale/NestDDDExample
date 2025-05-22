import { GetRoleByNameQuery } from '../../ports/incoming/query/getRoleByName.query';
import { TRoleRepository } from '../../ports/outgoing/role.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetRoleByNameQuery)
export class GetRoleByNameUsecase implements IQueryHandler<GetRoleByNameQuery> {
  constructor(private readonly roleRepository: TRoleRepository) {}

  async execute(query: GetRoleByNameQuery): Promise<any> {
    const { name } = query;
    const role = await this.roleRepository.findRoleByName(name);
    if (!role) {
      throw new Error(`Role with name ${query.name} not found`);
    }
    return role;
  }
}
