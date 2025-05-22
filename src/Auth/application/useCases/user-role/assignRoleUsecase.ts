import { AssignRoleCommand } from '../../ports/incoming';
import { CreateRoleCommand } from '../../ports/incoming/commands/createRole.command';
import { TRoleRepository } from '../../ports/outgoing/role.repository';
import { TUserRoleRepository } from '../../ports/outgoing/user-role.repository';
import { TUserRepository } from '../../ports/outgoing/user.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateRoleCommand)
export class AssignRoleUseCase implements ICommandHandler<AssignRoleCommand> {
  constructor(
    private readonly userRepository: TUserRepository,
    private readonly roleRepository: TRoleRepository,
    private readonly userRoleRepository: TUserRoleRepository,
  ) {}

  async execute(command: AssignRoleCommand): Promise<any> {
    const { userId, roleId } = command;

    for (const r of roleId) {
      // Check if user already has this role
      const hasRole = await this.userRoleRepository.hasRole(userId, r);
      if (!hasRole) {
        const save = await this.userRoleRepository.saveUserRoles(userId, r);
        if (!save) {
          throw new Error(`Role Id ${r} for User ${userId} has not been added`);
        }
      }
    }
    return this.userRepository.findUserById(userId);
  }
}
