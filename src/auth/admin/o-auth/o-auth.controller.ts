import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OAuthService } from '@app/auth/admin/o-auth/o-auth.service';
import { UserLogDto } from '@app/user/user-log.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { ApiAdminAuth } from '@app/shared/swagger';

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

  @ApiAdminAuth()
  @Post('check')
  async check() {
    return await this.oAuthService.check();
  }

  @ApiAdminAuth()
  @ApiResponse({
    description: "returns the authenticated user's permissions",
    type: String,
    isArray: true,
  })
  @Get('permissions')
  async getPermissions() {
    return await this.oAuthService.getPermissions();
  }
}
