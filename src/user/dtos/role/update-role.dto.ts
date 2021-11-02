import { Permission } from '@app/user/enums/permission.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  permissions?: Permission[];
}
