import { CustomerCreateDto } from '@app/customer/dto/customer/customer.create.dto';
import { CustomerDto } from '@app/customer/dto/customer/customer.dto';
import { CustomerUpdateDto } from '@app/customer/dto/customer/customer.update.dto';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { hash } from 'bcrypt';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // find all customers
  findAll(): Promise<CustomerDto[]> {
    return this.customerRepository.find();
  }
  // Find one customer
  async getCustomerById(customerId): Promise<CustomerDto> {
    try {
      const customer = await this.customerRepository.findOneOrFail(customerId);
      return customer;
    } catch (err) {
      throw new NotFoundException("Customer doesn't exist");
    }
  }

  // create a customer
  async createCustomer(customer: CustomerCreateDto): Promise<Customer> {
    const target: Customer = {
      ...customer,
      password: await hash(customer.password, 10),
    };
    return await this.customerRepository.save(target);
  }

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
