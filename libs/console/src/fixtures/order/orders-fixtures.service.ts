import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Order } from '@app/order/entities/order.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FixturesInterface } from '../fixtures.interface';

Injectable();
export class OrdersFixturesService implements FixturesInterface {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(AddressCustomer)
    private readonly addressRepository: Repository<AddressCustomer>,
  ) {}

  async load() {}

  async clean() {
    await this.orderRepository.delete({});
  }
}
