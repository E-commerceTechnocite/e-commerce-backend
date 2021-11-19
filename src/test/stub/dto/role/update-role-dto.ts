import { PermissionUtil } from '@app/user/enums/permission.enum';
import { UpdateRoleDto } from '@app/user/dtos/role/update-role.dto';

export const updateRoleDto = (): UpdateRoleDto => {
  const r = new UpdateRoleDto();
  r.name = 'test';
  r.permissions = [...PermissionUtil.allReadPermissions()];
  return r;
};
