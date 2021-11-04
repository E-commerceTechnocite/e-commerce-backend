import { CustomerLogDto } from '@app/customer/services/customer/customer-log.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from '@nestjs/common';

import { AuthService } from './customer-auth.service';
import { ApiCustomerAuth, ErrorSchema } from '@app/shared/swagger';
import { OAuthResponseDto } from '@app/auth/dto/o-auth-response.dto';
import { RefreshTokenDto } from '@app/auth/dto/refresh-token.dto';
import { CustomerTokenDataDto } from '@app/auth/customer/dto/customer-token-data.dto';

@ApiTags('Security (Customer)')
@Controller({ path: '/customer/o-auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: OAuthResponseDto })
  @ApiBadRequestResponse({ type: ErrorSchema })
  @Post('login')
  async login(@Body() customer: CustomerLogDto) {
    return await this.authService.login(customer);
  }

  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({ type: OAuthResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorSchema })
  @Post('refresh')
  async refresh(@Body() { refresh_token }: RefreshTokenDto) {
    return await this.authService.refreshToken(refresh_token);
  }

  @ApiBody({ type: RefreshTokenDto })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@Body() { refresh_token }: RefreshTokenDto) {
    return await this.authService.logout(refresh_token);
  }

  @Post('check')
  @ApiOkResponse({ type: CustomerTokenDataDto })
  @ApiUnauthorizedResponse({ type: ErrorSchema })
  @ApiCustomerAuth()
  @Post('check')
  async check(@Req() req: Express.Request & Request) {
    return await this.authService.check(req);
  }
}
