import { CustomerLogDto } from '@app/customer/services/customer/customer-log.dto';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from '@nestjs/common';

import { AuthService } from './customer-auth.service';
import { ApiCustomerAuth } from '@app/shared/swagger';

@ApiTags('Security (Customer)')
@Controller({ path: '/customer/o-auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() customer: CustomerLogDto) {
    return await this.authService.login(customer);
  }

  @Post('refresh')
  async refresh(@Body() { refresh_token }) {
    return await this.authService.refreshToken(refresh_token);
  }

  @Post('logout')
  async logout(@Body() { refresh_token }) {
    return await this.authService.logout(refresh_token);
  }

  @Post('check')
  @ApiCustomerAuth()
  async check(@Req() req: Request) {
    return await this.authService.check(req);
  }
}
