import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '@app/user/user.dto';

@ApiTags('Security')
@Controller({ path: 'o-auth', version: '1' })
export class OAuthController {
  @Post('login')
  login(@Body() user: UserDto) {
    throw new InternalServerErrorException('Not yet implemented');
  }
}
