import { CustomerCreateDto } from '@app/customer/dto/customer/customer.create.dto';

import { CustomerUpdateDto } from '@app/customer/dto/customer/customer.update.dto';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { hash } from 'bcrypt';
import { ShoppingCartService } from '@app/shopping-cart/services/shopping-cart/shopping-cart.service';
import { OrderService } from '@app/order/services/order.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private shoppingCarteService: ShoppingCartService,
    private orderService: OrderService,
  ) {}

  // find all customers
  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
  // Find one customer
  async getCustomerById(customerId): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findOneOrFail({
        where: { id: customerId },
      });
      delete customer.password;
      return customer;
    } catch (err) {
      throw new NotFoundException(
        `Customer doesn't exist at id : ${customerId}`,
      );
    }
  }

  // create a customer
  async createCustomer(customer: CustomerCreateDto): Promise<Customer> {
    const shoppingCart = await this.shoppingCarteService.createShoppingCart();

    const target: Customer = {
      ...customer,
      shoppingCart: shoppingCart,
      password: await hash(customer.password, 10),
    };
    // creer un order pour ce customer

    const order = await this.orderService.createOrder(target);
    return await this.customerRepository.save(target);
  }

  async update(
    id: string | number,
    entity: Customer | CustomerUpdateDto,
  ): Promise<void> {
    let customer;
    try {
      customer = await this.customerRepository.findOneOrFail({
        where: { id: id },
      });
    } catch {
      throw new NotFoundException(`Customer does not exists at id : ${id}`);
    }

    const target: Customer = {
      ...entity,
      ...customer,
      password: await hash(entity.password, 10),
    };

    await this.customerRepository.save(target);
  }

  async deleteFromId(id: string | number): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if (result.affected < 1) {
      throw new BadRequestException(`Customer not found or already deleted`);
    }
  }

  async delete(entity: Customer): Promise<void> {
    const result = await this.customerRepository.delete(entity);
    if (result.affected < 1) {
      throw new BadRequestException(`Customer not found or already deleted`);
    }
  }

  // find all customers

  // Find one customer
  // async getCustomerById(customerId): Promise<CustomerDto> {
  //   try {
  //     const customer = await this.customerRepository.findOneOrFail({
  //       where: { id: customerId },
  //     });
  //     return customer;
  //   } catch (err) {
  //     throw new NotFoundException("Customer doesn't exist");
  //   }
  // }

  // create a customer
  // async createCustomer(customer: CustomerCreateDto): Promise<Customer> {
  //   const target: Customer = {
  //     ...customer,
  //     password: await hash(customer.password, 10),
  //   };
  //   return await this.customerRepository.save(target);
  // }

  // update customer
  async updateCustomer(
    customerId: string,
    customer: CustomerUpdateDto,
  ): Promise<Customer> {
    let updatedCustomer = await this.getCustomerById(customerId);
    updatedCustomer = {
      ...updatedCustomer,
      ...customer,
      password: await hash(customer.password, 10),
    };

    return this.customerRepository.save(updatedCustomer);
  }

  // Delete customer
  async deleteCustomer(customerId): Promise<any> {
    let deletedCustomer = await this.getCustomerById(customerId);
    return this.customerRepository.delete(customerId);
  }
}
