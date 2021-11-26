import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { EntityRepository } from 'typeorm';
import { AddressCustomer } from '../entity/customer-address.entity';

@EntityRepository(AddressCustomer)
export class AddressCustomerRepository extends GenericRepository<AddressCustomer> {}
