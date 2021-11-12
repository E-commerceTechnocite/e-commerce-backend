import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiAdminAuth } from '@app/shared/swagger';
import { JwtAuthGuard } from '@app/auth/admin/guard/jwt-auth.guard';

export const UseAdminGuard = (): ClassDecorator & MethodDecorator =>
  applyDecorators(ApiAdminAuth(), UseGuards(JwtAuthGuard));
