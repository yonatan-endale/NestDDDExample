import { GetAllRolesQuery } from '../../ports/incoming/query/getAllRoles.query';
import { TRoleRepository } from '../../ports/outgoing/role.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllRolesQuery)
export class GetAllRolesUseCase implements IQueryHandler<GetAllRolesQuery> {
  constructor(private readonly roleRepository: TRoleRepository) {}

  async execute(query: GetAllRolesQuery): Promise<any> {
    const { searchString, perPage, currentPage } = query;

    console.log('->', searchString, perPage, currentPage);

    return await this.roleRepository.findAllRoles();
  }
}
