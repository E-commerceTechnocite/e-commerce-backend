import { ApiResponseProperty } from '@nestjs/swagger';

export class AdminTokenDataDto {
  @ApiResponseProperty()
  id: string;
  @ApiResponseProperty()
  username: string;
  @ApiResponseProperty()
  email: string;
  @ApiResponseProperty()
  roleId: string;
  @ApiResponseProperty()
  roleName: string;
  @ApiResponseProperty()
  iat?: number;
  @ApiResponseProperty()
  exp?: number;
}
