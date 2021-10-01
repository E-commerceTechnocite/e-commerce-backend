import { applyDecorators } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';

export const ApiCustomerAuth = (
  requirements?: string[],
): MethodDecorator & ClassDecorator => {
  return applyDecorators(ApiSecurity('customer', requirements));
};
