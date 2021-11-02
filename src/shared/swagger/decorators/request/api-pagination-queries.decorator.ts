import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiPaginationQueries = (): MethodDecorator =>
  applyDecorators(
    ApiQuery({ name: 'page', required: false }),
    ApiQuery({ name: 'limit', required: false }),
    ApiQuery({
      name: 'orderBy',
      required: false,
      type: 'string',
      description: 'Entity property',
    }),
    ApiQuery({
      name: 'order',
      required: false,
      type: 'string',
      description: 'DESC or ASC',
    }),
  );
