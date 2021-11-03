import { Gender } from '@app/customer/entities/customer/customer.enum';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class CustomerDto {
  //idCustomer: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  gender: Gender;
  //@IsDate()
  birthDate: Date;
  @IsNotEmpty()
  newsletter: boolean;
}
