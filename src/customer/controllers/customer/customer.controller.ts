import { CustomerDto } from "@app/customer/dto/customer/customer.dto";
import { Customer } from "@app/customer/entities/customer/customer.entity";
import { CustomerService } from "@app/customer/services/customer/customer.service";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller('customers')
export class CustomerController {
    constructor(private customerService: CustomerService){}
  
    // create a customer
    @Post()
    createCustomer(@Body()customer: CustomerDto):Promise<CustomerDto>{
        return this.customerService.createCustomer(customer);
    }

    // find all customers
    @Get()
    findAll():Promise<CustomerDto[]>{
        return this.customerService.findAll();
    }
    
    // find a customer by id
    @Get(':customerId')
    findCustomerById(@Param('customerId') customerId):Promise<CustomerDto>{
        return this.customerService.getCustomerById(customerId)    
    }
    
    //update a customer
    @Put(':customerId')
    updateCustomer(@Param('customerId') customerId,@Body() customer ):Promise<CustomerDto>{
        return this.customerService.updateCustomer(customerId,customer);
    }
    // Delete a customer
    @Delete(':customerId')
    deleteCustomer(@Param('customerId')customerId):Promise<CustomerDto>{
        return this.customerService.deleteCustomer(customerId)
    }

}