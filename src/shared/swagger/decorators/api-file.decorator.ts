import { ApiBody } from '@nestjs/swagger';

export const ApiFile = (filename: string): MethodDecorator => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [filename]: {
            type: 'file',
            format: 'binary',
          },
        },
      },
    })(target, key, descriptor);
  };
};
