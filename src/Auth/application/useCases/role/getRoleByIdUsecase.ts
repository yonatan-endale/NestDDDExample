import { GetRoleByIdQuery } from '../../ports/incoming/query/getRoleById.query';
import { TRoleRepository } from '../../ports/outgoing/role.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetRoleByIdQuery)
export class GetAllRolesUseCase implements IQueryHandler<GetRoleByIdQuery> {
  constructor(private readonly roleRepository: TRoleRepository) {}

  async execute(query: GetRoleByIdQuery): Promise<any> {
    const { id } = query;
    const role = await this.roleRepository.findRoleById(id);
    if (!role) {
      throw new Error(`Role with id ${query.id} not found`);
    }
    return role;
  }
}
