import { CustomerCreateDto } from '@app/customer/dto/customer/customer.create.dto';
import { CustomerDto } from '@app/customer/dto/customer/customer.dto';
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
import { CrudServiceInterface } from '@app/shared/interfaces/crud-service.interface';

@Injectable()
export class CustomerService
  implements
    CrudServiceInterface<Customer, CustomerCreateDto, CustomerUpdateDto>
{
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async find(id: string | number): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findOneOrFail({
        where: { id: id },
      });
      delete customer.password;
      return customer;
    } catch (err) {
      throw new NotFoundException(`Customer doesn't exist at id : ${id}`);
    }
  }

  async create(entity: Customer | CustomerCreateDto): Promise<Customer> {
    const target: Customer = {
      ...entity,
      password: await hash(entity.password, 10),
    };
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
  findAll(): Promise<CustomerDto[]> {
    return this.customerRepository.find();
  }
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
  // async updateCustomer(
  //   customerId: string,
  //   customer: CustomerUpdateDto,
  // ): Promise<Customer> {
  //   let updatedCustomer = await this.getCustomerById(customerId);
  //   updatedCustomer = {
  //     ...updatedCustomer,
  //     ...customer,
  //     password: await hash(customer.password, 10),
  //   };

  //   return this.customerRepository.save(updatedCustomer);
  // }

  // Delete customer
  // async deleteCustomer(customerId): Promise<any> {
  //   let deletedCustomer = await this.getCustomerById(customerId);
  //   return this.customerRepository.delete(customerId);
  // }
}
