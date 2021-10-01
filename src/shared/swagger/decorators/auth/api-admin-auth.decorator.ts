import { applyDecorators } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';

export const ApiAdminAuth = (
  requirements?: string[],
): MethodDecorator & ClassDecorator => {
  return applyDecorators(ApiSecurity('admin', requirements));
};
