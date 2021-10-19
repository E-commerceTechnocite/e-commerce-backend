import { Product } from '@app/product/entities/product.entity';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { OrderProductService } from '../services/order-product.service';

@Controller('orderProduct')
export class OrderProductController {
  constructor(private orderProductService: OrderProductService) {}

  @Get()
  async getOrder(): Promise<string> {
    return "this is the customer's order";
  }

  @Post()
  async createOrderProduct(): Promise<Product> {
    return await this.orderProductService.createOrderProduct();
  }
}
