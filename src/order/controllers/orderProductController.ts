import { Product } from '@app/product/entities/product.entity';
import { ApiCustomerAuth, ErrorSchema } from '@app/shared/swagger';
import { CartItem } from '@app/shopping-cart/entities/cart-item.entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderProductCreateDto } from '../dto/order-create.dto';
import { OrderProduct } from '../entities/order-product.entity';

import { OrderProductService } from '../services/order-product.service';

@ApiCustomerAuth()
@ApiTags(`Order-product`)
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

  @ApiCreatedResponse({ type: OrderProduct })
  @ApiBody({ type: OrderProductCreateDto, required: false })
  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse({ type: ErrorSchema })
  @Post()
  async createOrderProduct(
    @Body('data') data: OrderProductCreateDto,
  ): Promise<void> {
    return await this.orderProductService.createOrderProduct(data);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse({ type: ErrorSchema })
  @Post('/purchase/:orderId')
  async executeOrderProduct(
    @Param('orderId') orderId: string,
  ): Promise<string> {
    return this.orderProductService.executeOrderProduct(orderId);
  }
}
