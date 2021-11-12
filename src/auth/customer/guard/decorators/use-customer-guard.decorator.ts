import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCustomerAuth } from '@app/shared/swagger';
import { JwtAuthGuard } from '@app/auth/customer/guard/customer-jwt-auth.guard';

export const UseCustomerGuardDecorator = (): MethodDecorator & ClassDecorator =>
  applyDecorators(ApiCustomerAuth(), UseGuards(JwtAuthGuard));
