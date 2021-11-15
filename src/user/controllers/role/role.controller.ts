import { Granted } from '@app/auth/admin/guard/decorators/granted.decorator';
import { UseAdminGuard } from '@app/auth/admin/guard/decorators/use-admin-guard.decorator';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { IsPositiveIntPipe } from '@app/shared/pipes/is-positive-int.pipe';
import {
  ApiOkPaginatedResponse,
  ErrorSchema,
  ApiPaginationQueries,
} from '@app/shared/swagger';
import { RoleDto } from '@app/user/dtos/role/role.dto';
import { UpdateRoleDto } from '@app/user/dtos/role/update-role.dto';
import { Role } from '@app/user/entities/role.entity';
import { Permission, PermissionUtil } from '@app/user/enums/permission.enum';
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

@ApiTags('Role')
@ApiUnauthorizedResponse({ type: ErrorSchema })
@UseAdminGuard()
@Controller({ path: 'role', version: '1' })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Granted(Permission.READ_ROLE)
  @ApiOkResponse({ schema: { example: [...PermissionUtil.allPermissions()] } })
  @Get('/permissions')
  getPermissions(): string[] {
    return Object.values(Permission);
  }

  @Granted(Permission.READ_ROLE)
  @ApiOkPaginatedResponse(Role)
  @ApiNotFoundResponse({ type: ErrorSchema })
  @ApiPaginationQueries()
  @Get()
  async find(
    @Query('page', IsPositiveIntPipe) page = 1,
    @Query('limit', IsPositiveIntPipe) limit = 10,
    @Query('orderBy') orderBy: string = null,
    @Query('order') order: 'DESC' | 'ASC' = null,
  ): Promise<PaginationDto<Role>> {
    return this.roleService.getPage(page, limit, { orderBy, order });
  }

  @Granted(Permission.READ_ROLE)
  @ApiOkResponse({ type: Role, isArray: true })
  @Get('all')
  async findAll(): Promise<any[]> {
    return await this.roleService.findAll();
  }

  @Granted(Permission.READ_ROLE)
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: ErrorSchema })
  @ApiResponse({ type: Role })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Role> {
    return this.roleService.find(id);
  }

  @Granted(Permission.CREATE_ROLE)
  @ApiBody({ type: RoleDto, required: false })
  @ApiCreatedResponse({ type: Role })
  @ApiBadRequestResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() role: RoleDto): Promise<any> {
    return await this.roleService.create(role);
  }

  @Granted(Permission.UPDATE_ROLE)
  @ApiBody({ type: UpdateRoleDto, required: false })
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() role: UpdateRoleDto,
  ): Promise<any> {
    return this.roleService.update(id, role);
  }

  @Granted(Permission.DELETE_ROLE)
  @ApiNoContentResponse()
  @ApiBadRequestResponse({ type: ErrorSchema })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.roleService.deleteFromId(id);
  }
}
