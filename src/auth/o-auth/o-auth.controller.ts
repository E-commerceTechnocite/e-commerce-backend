import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '@app/user/user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@app/user/user.entity';
import { Role } from '@app/auth/roles.decorator';

@ApiTags('Security')
@Controller({ path: 'o-auth', version: '1' })
export class OAuthController {
  constructor(private readonly jwt: JwtService) {}

  @Post('login')
  login(@Body() user: UserDto) {
    const entity: User = {
      ...user,
      roles: [Role.User],
      email: 'user.username@test.com',
    };
    return this.jwt.sign(entity);
    throw new InternalServerErrorException('Not yet implemented');
  }
}
