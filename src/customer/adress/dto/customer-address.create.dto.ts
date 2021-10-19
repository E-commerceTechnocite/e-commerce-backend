import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

export class CustomerAddressCreateDto {
  address?: string;

  zipcode?: string;

  city?: string;

  region?: string;

  countryId: string;
}
