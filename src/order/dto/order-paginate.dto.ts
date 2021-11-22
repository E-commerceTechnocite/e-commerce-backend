import { AddressCustomer } from '@app/customer/adress/entity/customer-address.entity';
import { Customer } from '@app/customer/entities/customer/customer.entity';
import { OrderProduct } from '../entities/order-product.entity';

export class OrderPaginateDto {
  id?: string;

  createdAt?: Date;

  status?: number;

  paymentType?: number;

  orderProducts?: OrderProduct[];

  customerId?: Customer;

  adresse?: AddressCustomer;
}
