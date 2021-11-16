import { OrderProduct } from '@app/order/entities/order-product.entity';
import { GenericRepository } from '@app/shared/repositories/generic.repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends GenericRepository<OrderProduct> {
  async getOrderProductInfo(): Promise<any[]> {
    return await this.manager.connection
      .createQueryRunner()
      .query(
        'SELECT order_product.id,order_product.productId,order_product.quantity,order_product.orderId FROM `order_product`',
      );
  }
}
