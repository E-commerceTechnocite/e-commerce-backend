import { Product } from '@app/product/entities/product.entity';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { OrderProductCreateDto } from '../dto/order-create.dto';
import { OrderProduct } from '../entities/order-product.entity';

import { OrderProductService } from '../services/order-product.service';

@Controller({ path: 'order-product', version: '1' })
export class OrderProductController {
  constructor(private orderProductService: OrderProductService) {}

  @Get()
  async getOrder(): Promise<string> {
    return "this is the customer's order";
  }

  /*  @Post()
  async createOrderProduct(): Promise<OrderProduct> {
    return await this.orderProductService.createOrderProduct();
  } */

  @Post()
  async createOrderProduct(
    @Body('data') data: OrderProductCreateDto,
  ): Promise<void> {
    return await this.orderProductService.createOrderProduct(data);
  }

  @Post('/purchase/:orderId')
  async executeOrderProduct(
    @Param('orderId') orderId: string,
  ): Promise<string> {
    return this.orderProductService.executeOrderProduct(orderId);
  }
}