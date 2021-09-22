import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OAuthService } from '@app/auth/o-auth/o-auth.service';
import { UserLogDto } from '@app/user/user-log.dto';
import { RefreshTokenDto } from '../refresh-token.dto';

@ApiTags('Security')
@Controller({ path: 'o-auth', version: '1' })
export class OAuthController {
  constructor(private readonly oAuthService: OAuthService) {}

  @Post('login')
  async login(@Body() user: UserLogDto) {
    return await this.oAuthService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() { refresh_token }: RefreshTokenDto) {
    return await this.oAuthService.refreshToken(refresh_token);
  }

  @Post('logout')
  async logout(@Body() { refresh_token }: RefreshTokenDto) {
    return await this.oAuthService.logout(refresh_token);
  }
}
