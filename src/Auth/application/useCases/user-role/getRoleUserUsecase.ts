import { GetRoleUsersQuery } from '../../ports/incoming';
import { TUserRoleRepository } from '../../ports/outgoing/user-role.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetRoleUsersQuery)
export class GetUserRoleUseCase implements IQueryHandler<GetRoleUsersQuery> {
  constructor(private readonly userRoleRepository: TUserRoleRepository) {}

  async execute(query: GetRoleUsersQuery): Promise<any> {
    const { roleId } = query;
    const users = await this.userRoleRepository.findRoleUsers(roleId);
    if (!users) throw new Error(`user role not found`);
    return users;
  }
}
