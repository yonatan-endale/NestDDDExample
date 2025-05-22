import { User } from 'src/Auth/domain/entities/user.entity';
import { GetUserByIdQuery } from '../../ports/incoming/query/getUserById.query';
import { TUserRepository } from '../../ports/outgoing/user.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdUsecase implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: TUserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const { id } = query;
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new Error(`user with id ${query.id} not found`);
    }
    return user;
  }
}
