import { SetMetadata } from '@nestjs/common';
import { Permission } from '@app/user/enums/permission.enum';

export const PERMISSIONS_KEY = 'permissions';

export const Granted = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
