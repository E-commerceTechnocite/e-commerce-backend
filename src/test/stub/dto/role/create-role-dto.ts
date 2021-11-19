import { RoleDto } from '@app/user/dtos/role/role.dto';
import { PermissionUtil } from '@app/user/enums/permission.enum';

export const createRoleDto = (): RoleDto => {
  const r = new RoleDto();
  r.name = 'test';
  r.permissions = [...PermissionUtil.allReadPermissions()];
  return r;
};
