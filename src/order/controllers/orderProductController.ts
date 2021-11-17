import { AdminJwtAuthGuard } from '@app/auth/admin/guard/admin-jwt-auth.guard';
import { ApiAdminAuth, ErrorSchema } from '@app/shared/swagger';

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { OrderProductCreateDto } from '../dto/order-create.dto';
import { OrderProduct } from '../entities/order-product.entity';

import { OrderProductService } from '../services/order-product.service';

@ApiAdminAuth()
@ApiTags('Order Product')
@UseGuards(AdminJwtAuthGuard)
@ApiUnauthorizedResponse({ type: ErrorSchema })
@Controller({ path: 'order-product', version: '1' })
export class OrderProductController {
  constructor(private orderProductService: OrderProductService) {}

  @Get()
  async getOrder(): Promise<OrderProduct[]> {
    return this.orderProductService.find();
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
