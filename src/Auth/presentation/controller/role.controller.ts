import { Body, Controller, Post } from '@nestjs/common';
import { RoleAssignmentService } from '../../application/useCases/user-role/assignRoleUsecase';
import { AssignRoleRequest } from '../dtos/assign-role.request';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleAssignmentService) {}

  @Post('assign')
  async assign(@Body() req: AssignRoleRequest) {
    await this.roleService.execute(req);
    return { message: 'Role assigned successfully' };
  }
}
