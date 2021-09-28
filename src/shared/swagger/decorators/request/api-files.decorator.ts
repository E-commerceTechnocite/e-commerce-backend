import { ApiBody } from '@nestjs/swagger';

export const ApiFiles = (filename: string): MethodDecorator => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [filename]: {
            type: 'array',
            items: {
              type: 'file',
              format: 'binary',
            },
          },
        },
      },
    })(target, key, descriptor);
  };
};
