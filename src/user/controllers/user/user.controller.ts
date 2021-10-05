import { Granted } from '@app/auth/admin/granted.decorator';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import { ApiAdminAuth, ApiOkPaginatedResponse } from '@app/shared/swagger';
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
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiAdminAuth()
@ApiTags('Users')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Granted(Permission.READ_USER)
  @ApiOkPaginatedResponse(User)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<User>> {
    return this.userService.getPage(page, limit);
  }

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
