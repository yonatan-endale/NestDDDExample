import { GetAllUserQuery } from '../../ports/incoming/query/getAllUsers.query';
import { TUserRepository } from '../../ports/outgoing/user.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/Auth/domain/entities/user.entity';
@QueryHandler(GetAllUserQuery)
export class GetAllUserUseCase implements IQueryHandler<GetAllUserQuery> {
  constructor(private readonly userRepository: TUserRepository) {}

  async execute(query: GetAllUserQuery): Promise<User[]> {
    const { searchString, perPage, currentPage } = query;

    console.log('->', searchString, perPage, currentPage);

    return await this.userRepository.findAll();
  }
}
