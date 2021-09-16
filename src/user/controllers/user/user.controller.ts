import { Granted } from '@app/auth/granted.decorator';
import { User } from '@app/user/entities/user.entity';
import { Permission } from '@app/user/enums/permission.enum';
import { UserDto } from '@app/user/user.dto';
import { UserService } from '@app/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Granted(Permission.READ_USER)
  @ApiOkResponse()
  @ApiResponse({ type: User })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.find(id);
  }

  @Granted(Permission.CREATE_USER)
  @ApiCreatedResponse()
  @ApiBody({ type: UserDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() user: UserDto): Promise<any> {
    return await this.userService.create(user);
  }

  @Granted(Permission.UPDATE_USER)
  @ApiBody({ type: UserDto, required: false })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: UserDto): Promise<void> {
    return this.userService.update(id, user);
  }

  @Granted(Permission.DELETE_USER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.deleteFromId(id);
  }
}
