import { RemoveRoleFromUserCommand } from '../../ports/incoming/commands/removeRoleFromUser.command';
import { TUserRoleRepository } from '../../ports/outgoing/user-role.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

@CommandHandler(RemoveRoleFromUserCommand)
export class RemoveRoleFromUserUseCase
  implements ICommandHandler<RemoveRoleFromUserCommand>
{
  constructor(private readonly userRoleRepository: TUserRoleRepository) {}

  async execute(command: RemoveRoleFromUserCommand): Promise<any> {
    const { userId, roleId } = command;
    await this.userRoleRepository.deleteUserRoles(userId, roleId);
    return;
  }
}
