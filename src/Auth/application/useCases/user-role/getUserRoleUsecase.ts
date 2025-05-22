import { GetUserRoleQuery } from '../../ports/incoming/query/getUserRole.query';
import { TUserRoleRepository } from '../../ports/outgoing/user-role.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetUserRoleQuery)
export class GetUserRoleUseCase implements IQueryHandler<GetUserRoleQuery> {
  constructor(private readonly userRoleRepository: TUserRoleRepository) {}

  async execute(query: GetUserRoleQuery): Promise<any> {
    const { userId } = query;
    const userRole = await this.userRoleRepository.findUserRoles(userId);
    if (!userRole) throw new Error(`user role not found`);
    return userRole;
  }
}
