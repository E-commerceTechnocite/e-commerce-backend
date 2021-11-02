import { Granted } from '@app/auth/admin/guard/granted.decorator';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import {
  ApiAdminAuth,
  ApiOkPaginatedResponse,
  ApiPaginationQueries,
} from '@app/shared/swagger';
import { RoleDto } from '@app/user/dtos/role/role.dto';
import { UpdateRoleDto } from '@app/user/dtos/role/update-role.dto';
import { Role } from '@app/user/entities/role.entity';
import { Permission } from '@app/user/enums/permission.enum';
import { RoleService } from '@app/user/services/role/role.service';
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
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiAdminAuth()
@ApiTags('Role')
@Controller({ path: 'role', version: '1' })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Granted(Permission.READ_ROLE)
  @ApiResponse({ type: null })
  @Get('/permissions')
  getPermissions(): string[] {
    return Object.values(Permission);
  }

  @Granted(Permission.READ_ROLE)
  @ApiOkPaginatedResponse(Role)
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
  ): Promise<PaginationDto<Role>> {
    return this.roleService.getPage(page, limit);
  }

  @Granted(Permission.READ_ROLE)
  @ApiOkResponse()
  @ApiResponse({ type: Role })
  @Get('all')
  async findAll(): Promise<any[]> {
    return await this.roleService.findAll();
  }

  @Granted(Permission.READ_ROLE)
  @ApiOkResponse()
  @ApiResponse({ type: Role })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Role> {
    return this.roleService.find(id);
  }

  @Granted(Permission.CREATE_ROLE)
  @ApiBody({ type: RoleDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() role: RoleDto): Promise<any> {
    return await this.roleService.create(role);
  }

  @Granted(Permission.UPDATE_ROLE)
  @ApiBody({ type: UpdateRoleDto, required: false })
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() role: UpdateRoleDto,
  ): Promise<any> {
    return this.roleService.update(id, role);
  }

  @Granted(Permission.DELETE_ROLE)
  @ApiResponse({ type: null })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.roleService.deleteFromId(id);
  }
}
