import { AdminJwtAuthGuard } from '@app/auth/admin/guard/admin-jwt-auth.guard';
import { ApiAdminAuth, ErrorSchema } from '@app/shared/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';
import { OrderService } from '../services/order.service';

@ApiAdminAuth()
@ApiTags('Orders')
@UseGuards(AdminJwtAuthGuard)
@ApiUnauthorizedResponse({ type: ErrorSchema })
@Controller({ path: 'order', version: '1' })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async find(): Promise<Order[]> {
    return this.orderService.find();
  }

  @Get('infos')
  async getOrdersInfo(): Promise<any> {
    return await this.orderService.getOrdersInfos();
  }

  @Get('queryBuilder')
  async getOrdersQueryBuilder(): Promise<Order[]> {
    return await this.orderService.getOrdersQueryBuilder();
    // return null;
  }
}
