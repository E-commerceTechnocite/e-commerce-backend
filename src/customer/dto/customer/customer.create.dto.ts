import { Gender } from '@app/customer/entities/customer/customer.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CustomerCreateDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  phoneNumber: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  gender: Gender;

  //@IsDate()
  @ApiProperty({ required: false })
  birthDate: Date;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  newsletter: boolean;
}
