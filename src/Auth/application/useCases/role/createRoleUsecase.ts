import { CreateRoleCommand } from '../../ports/incoming/commands/createRole.command';
import { TRoleRepository } from '../../ports/outgoing/role.repository';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateRoleCommand)
export class CreateRoleUseCase implements ICommandHandler<CreateRoleCommand> {
  constructor(private readonly roleRepository: TRoleRepository) {}

  async execute(command: CreateRoleCommand): Promise<any> {
    const { name, description, permissions } = command;

    // Call the repository to create the role
    const createdRole = await this.roleRepository.createRole(
      name,
      permissions,
      description,
    );
    return createdRole;
  }
}
