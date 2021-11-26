import { Customer } from '@app/customer/entities/customer/customer.entity';
import { OrderProduct } from '@app/order/entities/order-product.entity';
import { Order } from '@app/order/entities/order.entity';
import { Product } from '@app/product/entities/product.entity';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { OrderProductRepository } from '../order-product/order-product.repository';

@EntityRepository(Order)
export class OrderRepository extends GenericRepository<Order> {
  async getOrdersInfo(): Promise<any> {
    return await this.manager.connection.createQueryRunner().query(
      'SELECT order.id,order.createdAt, order.status,' + //order
        ' customer.firstName, customer.lastName,' + //customer
        ' order_product.quantity, order_product.title,order_product.reference, order_product.price' + //order_product
        '  FROM `order`' +
        ' INNER JOIN `order_product` ON order.id = order_product.orderId' +
        ' INNER JOIN `customer` ON customer.id = order.customerId',
    );
  }

  async getOrdersQueryBuilder(): Promise<Order[]> {
    return await this.createQueryBuilder('o')
      .select('o.id', 'id')
      .addSelect('o.status', 'status')
      .addSelect('o.createdAt', 'createdAt')
      .addSelect('customer.firstName', 'firstName')
      .addSelect('customer.lastName', 'lastName')
      .innerJoin(Customer, 'customer', 'o.customerId = customer.id')
      .addSelect('order_product.quantity', 'quantity')
      .addSelect('order_product.title', 'title')
      .addSelect('order_product.reference', 'reference')
      .addSelect('order_product.price', 'price')
      .innerJoin(OrderProduct, 'order_product', 'o.id = order_product.orderId')
      .getRawMany();
  }
}
