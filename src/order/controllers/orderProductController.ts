import { AdminJwtAuthGuard } from '@app/auth/admin/guard/admin-jwt-auth.guard';
import { ApiAdminAuth, ErrorSchema } from '@app/shared/swagger';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { OrderProductCreateDto } from '../dto/order-create.dto';
import {
  GROUP_ORDER_PRODUCT,
  OrderProduct,
} from '../entities/order-product.entity';

import { OrderProductService } from '../services/order-product.service';

@ApiAdminAuth()
@ApiTags('Order Product')
@UseGuards(AdminJwtAuthGuard)
@ApiUnauthorizedResponse({ type: ErrorSchema })
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'order-product', version: '1' })
export class OrderProductController {
  constructor(private orderProductService: OrderProductService) {}

  @Get()
  @SerializeOptions({
    groups: [GROUP_ORDER_PRODUCT],
  })
  async getOrder(): Promise<OrderProduct[]> {
    return this.orderProductService.find();
  }

  /*  @Post()
  async createOrderProduct(): Promise<OrderProduct> {
    return await this.orderProductService.createOrderProduct();
  } */

  @Get('info')
  async findAll(): Promise<any[]> {
    return this.orderProductService.getInfo();
  }

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
