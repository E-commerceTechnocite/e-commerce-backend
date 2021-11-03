import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OAuthService } from '@app/auth/admin/o-auth/o-auth.service';
import { UserLogDto } from '@app/user/user-log.dto';
import { RefreshTokenDto } from '../../dto/refresh-token.dto';
import { ApiAdminAuth, ErrorSchema } from '@app/shared/swagger';
import { OAuthResponseDto } from '@app/auth/dto/o-auth-response.dto';
import { AdminTokenDataDto } from '@app/auth/admin/dto/admin-token-data.dto';
import { PermissionUtil } from '@app/user/enums/permission.enum';

@ApiTags('Security')
@Controller({ path: 'o-auth', version: '1' })
export class OAuthController {
  constructor(private readonly oAuthService: OAuthService) {}

  @ApiBody({ type: UserLogDto })
  @ApiOkResponse({ type: OAuthResponseDto })
  @ApiBadRequestResponse({ type: ErrorSchema })
  @Post('login')
  async login(@Body() user: UserLogDto) {
    return await this.oAuthService.login(user);
  }

  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({ type: OAuthResponseDto })
  @ApiUnauthorizedResponse({ type: ErrorSchema })
  @Post('refresh')
  async refresh(@Body() { refresh_token }: RefreshTokenDto) {
    return await this.oAuthService.refreshToken(refresh_token);
  }

  @ApiBody({ type: RefreshTokenDto })
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@Body() { refresh_token }: RefreshTokenDto) {
    return await this.oAuthService.logout(refresh_token);
  }

  @ApiAdminAuth()
  @ApiOkResponse({ type: AdminTokenDataDto })
  @ApiUnauthorizedResponse({ type: ErrorSchema })
  @Post('check')
  async check() {
    return await this.oAuthService.check();
  }

  @ApiAdminAuth()
  @ApiOkResponse({
    description: "returns the authenticated user's permissions",
    schema: {
      example: [...PermissionUtil.productPermissions()],
      description: 'Permissions',
    },
  })
  @Get('permissions')
  async getPermissions() {
    return await this.oAuthService.getPermissions();
  }
}
