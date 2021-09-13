import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '@app/user/user.dto';
import { OAuthService } from '@app/auth/o-auth/o-auth.service';

@ApiTags('Security')
@Controller({ path: 'o-auth', version: '1' })
export class OAuthController {
  constructor(private readonly oAuthService: OAuthService) {}

  @Post('login')
  async login(@Body() user: UserDto) {
    return await this.oAuthService.login(user);
  }
}
