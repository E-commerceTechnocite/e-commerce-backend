import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationMetadataDto } from '@app/shared/dto/pagination/pagination-metadata.dto';

export const ApiOkPaginatedResponse = <T extends Type<any>>(
  model: T,
): MethodDecorator =>
  applyDecorators(
    ApiExtraModels(PaginationMetadataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              meta: {
                $ref: getSchemaPath(PaginationMetadataDto),
              },
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
