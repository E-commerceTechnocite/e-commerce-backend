import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async find(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  // permer de creer un enregistrement dans la table order  des qu'un enregistrement est inseré dans la table customer
  async createOrder(): Promise<string> {
    /*  const order: Order = {
      

      
     
    };   */
    // let order = new Order();
    //return this.orderRepository.save(target);
    return 'order service';
  }
}
