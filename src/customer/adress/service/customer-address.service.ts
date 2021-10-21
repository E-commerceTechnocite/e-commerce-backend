import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Country } from '@app/product/entities/country.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CustomerAddressCreateDto } from '../dto/customer-address.create.dto';
import { AddressCustomer } from '../entity/customer-address.entity';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Order } from '@app/order/entities/order.entity';
import { getRepository } from 'typeorm';
import { CustomerAddressUpdateDto } from '../dto/customer-address.update.dto';

import { Exception } from 'handlebars';
@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectRepository(AddressCustomer)
    private readonly addressRepository: Repository<AddressCustomer>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  // get address of customer By Id
  async getAddressCustomer(addressId): Promise<AddressCustomer> {
    return this.addressRepository.findOne(addressId);
  }

  // get all address of customer
  async getAllAddressCustomer(): Promise<AddressCustomer[]> {
    return this.addressRepository.find();
  }

  async deleteAddressCustomer(Id: string): Promise<any> {
    const customerIdDB: string = this.request.user['id'];
    let address = await this.getAddress(Id, customerIdDB);
    console.log(address);
    if (!address) {
      throw new NotFoundException('address not found');
    }

    return this.addressRepository.delete(address);
  }

  async updateCustomerAddress(
    newAddress: CustomerAddressUpdateDto,
    Id: string,
  ): Promise<AddressCustomer> {
    const customerIdDB: string = this.request.user['id'];
    console.log(customerIdDB);

    let addr = await this.addressRepository.findOne(Id, {
      relations: ['customer'],
    });
    // verifier si cette address corespond au customer
    //console.log(addr);
    if (addr.customer.id != customerIdDB) {
      throw new NotFoundException('Address not found');
    }
    addr = {
      ...addr,
      ...newAddress,
    };
    return this.addressRepository.save(addr);
  }

  // create a customer
  async createCustomerAddress(
    addressCustomer: CustomerAddressCreateDto,
  ): Promise<AddressCustomer> {
    //  recupérer  l'id du customer plus validation
    if (!this.request.user) {
      throw new NotFoundException('User not found !');
    }
    const customerId: Customer = this.request.user['id'];

    //console.log(customerId);
    let customer = await this.getCustomerById(customerId);

    // recuperer le country
    let country = await this.getCountryById(addressCustomer.countryId);

    // Recuperer l'order
    let orders = await this.getCustomerOrders(customerId);

    const target: AddressCustomer = {
      ...addressCustomer,
      customer: customer,
      orders: orders,
      country: country,
    };

    return this.addressRepository.save(target);
  }

  // cette fonction permet de recupérer le customer par son id
  async getCustomerById(customerId): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findOneOrFail({
        id: customerId,
      });
      return customer;
    } catch (err) {
      throw new NotFoundException("Customer doesn't exist");
    }
  }

  // cette fonction permet de recupérer l'order du customer
  async getCustomerOrders(customerId): Promise<Order[]> {
    try {
      const order = await getRepository(Order)
        .createQueryBuilder('entity')
        .where('entity.customerId=:customerId', { customerId: customerId })
        .getMany();
      return order;
    } catch (err) {
      throw new NotFoundException("order  doesn't exist");
    }
  }

  // cette fonction permet de recupérer le country par son id
  async getCountryById(countryId): Promise<Country> {
    try {
      const country = await this.countryRepository.findOneOrFail({
        id: countryId,
      });
      return country;
    } catch (err) {
      throw new NotFoundException("Country  doesn't exist");
    }
  }

  // recuperer l'address sur base de l'id et customerId
  async getAddress(Id, customerId): Promise<AddressCustomer> {
    try {
      //
      const address = getRepository(AddressCustomer)
        .createQueryBuilder('entity')
        .where('entity.id =:Id AND entity.customer.id=:customerId', {
          Id: Id,
          customerId: customerId,
        })
        .getOne();

      return address;
    } catch (err) {
      throw new NotFoundException("Address  doesn't exist !");
    }
  }
}
