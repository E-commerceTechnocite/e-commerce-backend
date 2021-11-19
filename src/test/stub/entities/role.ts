import { Role } from '@app/user/entities/role.entity';
import { uuid } from '@app/test/util/id';
import { PermissionUtil } from '@app/user/enums/permission.enum';

export const role = (): Role => ({
  id: uuid(),
  superAdmin: false,
  name: 'user',
  permissions: [...PermissionUtil.allReadPermissions()],
});
