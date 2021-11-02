import { SetMetadata } from '@nestjs/common';

export const ADMIN_AUTHENTICATED_KEY = 'admin-authenticated';

export const AdminAuthenticated = () =>
  SetMetadata(ADMIN_AUTHENTICATED_KEY, true);
