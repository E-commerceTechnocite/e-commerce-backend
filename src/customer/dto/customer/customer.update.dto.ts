import {IsOptional} from 'class-validator';

export class CustomerUpdateDto {
       
    @IsOptional()
    username?: string;
    @IsOptional()
    password?: string;
    @IsOptional()
    email?: string;
    @IsOptional()
    phoneNumber?: string;
    @IsOptional()
    firstName?: string;
    @IsOptional()
    lastName?: string;
   
    //@IsDate()
    @IsOptional()
    birthDate?: Date;
    @IsOptional()
    newsletter?: boolean
}