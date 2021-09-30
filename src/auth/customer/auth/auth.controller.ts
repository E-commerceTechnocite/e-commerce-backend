import { CustomerLogDto } from '@app/customer/services/customer/customer-log.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('Security')
// @Controller({ path: 'o-auth', version: '1' })
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() customer: CustomerLogDto) {
    return await this.authService.login(customer);
  }

  //   @Post('refresh')
  //   async refresh(@Body() { refresh_token }: RefreshTokenDto) {
  //     return await this.authService.refreshToken(refresh_token);
  //   }

  //   @Post('logout')
  //   async logout(@Body() { refresh_token }: RefreshTokenDto) {
  //     return await this.authService.logout(refresh_token);
  //   }
}
