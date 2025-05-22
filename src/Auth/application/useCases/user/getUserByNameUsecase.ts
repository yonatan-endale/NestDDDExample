import { User } from 'src/Auth/domain/entities/user.entity';
import { GetUserByNameQuery } from '../../ports/incoming/query/getUserByName.query';
import { TUserRepository } from '../../ports/outgoing/user.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetUserByNameQuery)
export class GetUserByNameUsecase implements IQueryHandler<GetUserByNameQuery> {
  constructor(private readonly userRepository: TUserRepository) {}

  async execute(query: GetUserByNameQuery): Promise<User> {
    const { firstName } = query;
    const user = await this.userRepository.findUserByFirstName(firstName);
    if (!user) {
      throw new Error(`user with the name ${query.firstName} not found`);
    }
    return user;
  }
}
