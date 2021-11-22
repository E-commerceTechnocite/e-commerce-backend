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
    return await this.manager.connection
      .createQueryRunner()
      .query(
        'SELECT order.id, customer.firstName, customer.lastName, order.createdAt, order.status, order_product.quantity, product.title, product.price  FROM `order`' +
          ' INNER JOIN `order_product` ON order.id = order_product.orderId' +
          ' INNER JOIN `product` ON product.id = order_product.productId' +
          ' INNER JOIN `customer` ON customer.id = order.customerId',
      );
  }

  // async getOrdersQueryBuilder(): Promise<any> {
  //   return await this.createQueryBuilder('o')
  //     .select('o.id', 'id')
  //     .addSelect('o.status', 'status')
  //     .addSelect('o.createdAt', 'createdAt')
  //     .addSelect('customer.firstName', 'firstName')
  //     .addSelect('order_product.quantity', 'quantity')
  //     .addSelect('product.title', 'title')
  //     .addSelect('product.price', 'price')
  //     .innerJoin(Customer, 'customer')
  //     .innerJoin(OrderProduct, 'order_product')
  //     .innerJoin(Product, 'product')
  //     .getRawMany();
  // }
}
