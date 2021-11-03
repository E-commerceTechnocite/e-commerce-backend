import { ApiResponseProperty } from '@nestjs/swagger';

export class OAuthResponseDto {
  @ApiResponseProperty()
  access_token?: string;

  @ApiResponseProperty()
  refresh_token?: string;

  @ApiResponseProperty({ type: Number })
  iat?: string | number;

  @ApiResponseProperty({ type: Number })
  exp?: string | number;
}
