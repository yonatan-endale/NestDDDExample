import { AssignRoleDTO } from '../../application/dto/RoleDTOs';

export class AssignRoleRequest implements AssignRoleDTO {
  userId: string;
  roleId: string[];
}
