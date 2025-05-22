import { DeleteRoleCommand } from '../../ports/incoming/commands/deleteRole.command';
import { TRoleRepository } from '../../ports/outgoing/role.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleUseCase implements ICommandHandler<DeleteRoleCommand> {
  constructor(private readonly roleRepository: TRoleRepository) {}

  async execute(command: DeleteRoleCommand): Promise<any> {
    const { id } = command;

    // Call the repository to delete the role
    const deletedRole = await this.roleRepository.deleteRole(id);
    return deletedRole;
  }
}
