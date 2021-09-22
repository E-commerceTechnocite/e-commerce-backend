import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OAuthService } from '@app/auth/o-auth/o-auth.service';
import { UserLogDto } from '@app/user/user-log.dto';

@ApiTags('Security')
@Controller({ path: 'o-auth', version: '1' })
export class OAuthController {
  constructor(private readonly oAuthService: OAuthService) {}

  @Post('login')
  async login(@Body() user: UserLogDto) {
    return await this.oAuthService.login(user);
  }

  @ApiBody({})
  @Post('refresh')
  async refresh(@Body() { refresh_token }: { refresh_token: string }) {
    return await this.oAuthService.refreshToken(refresh_token);
  }

  @ApiBody({})
  @Post('logout')
  async logout(@Body() {refresh_token}: {refresh_token: string}){
    return await this.oAuthService.logout(refresh_token);
  }
}
