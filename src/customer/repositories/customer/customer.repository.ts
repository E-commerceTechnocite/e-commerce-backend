import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(Customer)
export class CustomerRepository extends GenericRepository<Customer> {}
