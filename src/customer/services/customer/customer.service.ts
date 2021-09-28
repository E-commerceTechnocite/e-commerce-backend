import { CustomerCreateDto } from '@app/customer/dto/customer/customer.create.dto';
import { CustomerDto } from '@app/customer/dto/customer/customer.dto';
import { CustomerUpdateDto } from '@app/customer/dto/customer/customer.update.dto';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';


@Injectable()
export class CustomerService {

  constructor(@InjectRepository(Customer) 
              private readonly  customerRepository:Repository<Customer> ){}

  // find all customers
  findAll():Promise<CustomerDto[]>{
         return this.customerRepository.find();

  }
  // Find one customer
  async getCustomerById(customerId): Promise<CustomerDto>{
        try {
            const customer = await this.customerRepository.findOneOrFail(customerId);
            return customer;
        } catch (err){
            throw new NotFoundException();
        }
   
  }

  // create a customer
   async createCustomer(customer: CustomerCreateDto): Promise<CustomerCreateDto>{
        return await this.customerRepository.save(customer);
  }

  // update customer
   async updateCustomer(customerId : string, customer : CustomerUpdateDto) : Promise<CustomerUpdateDto>{
       let updatedCustomer= await this.getCustomerById(customerId);
           updatedCustomer = {
           ...updatedCustomer,
           ...customer
       }

       return this.customerRepository.save(updatedCustomer);
   }
  
   // Delete customer
    async deleteCustomer(customerId): Promise<any>{
        let deletedCustomer = await this.getCustomerById(customerId);
        return this.customerRepository.delete(customerId);
    }


}
