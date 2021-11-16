import { Granted } from '@app/auth/admin/guard/decorators/granted.decorator';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import {
  ApiOkPaginatedResponse,
  ErrorSchema,
  ApiPaginationQueries,
} from '@app/shared/swagger';
import { CreateUserDto } from '@app/user/create-user.dto';
import { User } from '@app/user/entities/user.entity';
import { Permission } from '@app/user/enums/permission.enum';
import { UpdateUserDto } from '@app/user/update-user.dto';
import { UserService } from '@app/user/services/user/user.service';
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
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AdminAuthenticated } from '@app/auth/admin/guard/decorators/admin-authenticated.decorator';
import { UseAdminGuard } from '@app/auth/admin/guard/decorators/use-admin-guard.decorator';

@AdminAuthenticated()
@ApiTags('Users')
@ApiUnauthorizedResponse({ type: ErrorSchema })
@UseAdminGuard()
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Granted(Permission.READ_USER)
  @ApiOkPaginatedResponse(User)
  @ApiNotFoundResponse({ type: ErrorSchema })
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
    @Query('orderBy') orderBy: string = null,
    @Query('order') order: 'DESC' | 'ASC' = null,
  ): Promise<PaginationDto<User>> {
    return this.userService.getPage(page, limit, { orderBy, order });
  }

  @Granted(Permission.READ_USER)
  @ApiOkResponse({ type: User, isArray: true })
  @Get('all')
  async findAll(): Promise<any[]> {
    return this.userService.findAll();
  }

  @Granted(Permission.READ_USER)
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ type: ErrorSchema })
  @ApiResponse({ type: User })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.userService.find(id);
  }

  @Granted(Permission.CREATE_USER)
  @ApiCreatedResponse()
  @ApiBody({ type: CreateUserDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() user: CreateUserDto): Promise<any> {
    return await this.userService.create(user);
  }

  @Granted(Permission.UPDATE_USER)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorSchema })
  @ApiBody({ type: UpdateUserDto, required: false })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<void> {
    return this.userService.update(id, user);
  }

  @Granted(Permission.DELETE_USER)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userService.deleteFromId(id);
  }
}
