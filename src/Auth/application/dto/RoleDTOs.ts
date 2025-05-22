// CreateRoleDto
export class CreateRoleDto {
  name!: string;
  description?: string;
  permissions: string[] = [];
}
// UpdateRoleDto
export class UpdateRoleDto {
  name?: string;
  description?: string;
  permissions?: string[];
}
export class AssignRoleDTO {
  userId: string;
  roleId: string[];
}
