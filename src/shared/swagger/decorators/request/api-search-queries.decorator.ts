import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiSearchQueries = (): MethodDecorator =>
  applyDecorators(
    ApiQuery({ name: 'q', description: 'Query string' }),
    ApiQuery({ name: 'page', description: 'Page', required: false }),
    ApiQuery({ name: 'limit', required: false }),
  );
