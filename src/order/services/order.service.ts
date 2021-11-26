import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order/order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async find(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  // permer de creer un enregistrement dans la table order  des qu'un enregistrement est inseré dans la table customer
  async createOrder(): Promise<string> {
    /*  const order: Order = {
      

      
     
    };   */
    // let order = new Order();
    // return this.orderRepository.save(target);
    return 'order service';
  }

  async getOrdersInfos(): Promise<any> {
    return await this.orderRepository.getOrdersInfo();
  }

  async getOrdersQueryBuilder(): Promise<Order[]> {
    return await this.orderRepository.getOrdersQueryBuilder();
  }
}
