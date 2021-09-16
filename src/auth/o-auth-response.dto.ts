export class OAuthResponseDto {
  access_token?: string;
  refresh_token?: string;
  iat?: string | number;
  exp?: string | number;
}
