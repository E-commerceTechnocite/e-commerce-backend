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

  // create a customer
  async createCustomerAddress(
    addressCustomer: CustomerAddressCreateDto,
  ): Promise<AddressCustomer> {
    //  recupérer  l'id du customer plus validation
    if (!this.request.user) {
      throw new NotFoundException('User not found !');
    }
    const customerId: Customer = this.request.user['id'];
    let customer = await this.getCustomerById(customerId);
    // recuperer le country
    let country = await this.countryRepository.findOneOrFail({
      id: addressCustomer.countryId,
    });

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
}
