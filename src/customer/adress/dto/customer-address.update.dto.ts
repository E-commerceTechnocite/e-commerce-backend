import { IsNotEmpty } from 'class-validator';

export class CustomerAddressUpdateDto {
  @IsNotEmpty()
  address?: string;
  @IsNotEmpty()
  zipcode?: string;
  @IsNotEmpty()
  city?: string;
  @IsNotEmpty()
  region?: string;
  @IsNotEmpty()
  countryId?: string;
}
