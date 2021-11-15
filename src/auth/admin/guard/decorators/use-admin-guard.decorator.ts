import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiAdminAuth } from '@app/shared/swagger';
import { AdminJwtAuthGuard } from '@app/auth/admin/guard/admin-jwt-auth.guard';

export const UseAdminGuard = (): ClassDecorator & MethodDecorator =>
  applyDecorators(ApiAdminAuth(), UseGuards(AdminJwtAuthGuard));
