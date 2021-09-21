import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
}
