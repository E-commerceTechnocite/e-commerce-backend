import { ApiResponseProperty } from '@nestjs/swagger';

export class CustomerTokenDataDto {
  @ApiResponseProperty()
  id: string;
  @ApiResponseProperty()
  username: string;
  @ApiResponseProperty()
  email: string;
  @ApiResponseProperty()
  iat?: number;
  @ApiResponseProperty()
  exp?: number;
}
