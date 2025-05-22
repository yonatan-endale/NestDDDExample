import { UpdateRoleCommand } from '../../ports/incoming/commands/updateRole.command';
import { TRoleRepository } from '../../ports/outgoing/role.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleUseCase implements ICommandHandler<UpdateRoleCommand> {
  constructor(private readonly roleRepository: TRoleRepository) {}

  async execute(command: UpdateRoleCommand): Promise<boolean> {
    const { id, name, description, permissions } = command;

    // Call the repository to create the role
    const updatedRole = await this.roleRepository.updateRole(
      id,
      name,
      permissions,
      description,
    );
    if (!updatedRole) {
      throw new Error(`Update failed for ROLE_ID ${command.name}`);
    }

    return updatedRole;
  }
}
