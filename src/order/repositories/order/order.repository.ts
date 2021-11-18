import { Order } from '@app/order/entities/order.entity';
import { PaginationDto } from '@app/shared/dto/pagination/pagination.dto';
import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { EntityRepository } from 'typeorm';

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
}
