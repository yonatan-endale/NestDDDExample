import { User } from 'src/Auth/domain/entities/user.entity';

export abstract class TUserRepository {
  abstract findUserById(id: string): Promise<User>;
  abstract findUserByFirstName(name: string): Promise<User>;
  abstract findAllUsers(): Promise<User[]>;
}
