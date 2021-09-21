import { Permission } from '@app/user/enums/permission.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  permissions?: Permission[];
}
