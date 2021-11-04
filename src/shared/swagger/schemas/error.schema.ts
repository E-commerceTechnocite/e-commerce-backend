import { ApiResponseProperty } from '@nestjs/swagger';

export class ErrorSchema {
  @ApiResponseProperty({ type: Number, example: 404 })
  statusCode: number;

  @ApiResponseProperty({
    type: String,
    example: '{entity} not found at id {id}',
  })
  message?: string;

  @ApiResponseProperty({ type: String, example: 'Not Found' })
  error?: string;
}
