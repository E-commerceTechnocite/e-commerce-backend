import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Order } from '@app/order/entities/order.entity';
import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
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
    private readonly logger: ConsoleLogger,
  ) {}

  async load() {
    const customers = await this.customerRepository.find();

    const orders = customers.map<Order>((customer) => ({
      status: 0,
      paymentType: 0,
      customer: customer,
      address: customer.addressCustomers[0],
    }));
    await this.orderRepository.save(orders);
    this.logger.log('Orders added');
  }

  async clean() {
    await this.orderRepository.delete({});
  }
}
