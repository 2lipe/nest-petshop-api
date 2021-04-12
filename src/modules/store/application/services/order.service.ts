import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/modules/store/domain/entities/order.entity';
import { CreateOrderDto } from 'src/modules/store/domain/dtos/order/create-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) private readonly _orderRepository: Repository<OrderEntity>) {}

  public async getByNumber(number: string): Promise<OrderEntity> {
    return await this._orderRepository.findOne({ where: { number } });
  }

  public async getByCustomer(customer: string): Promise<OrderEntity[]> {
    return await this._orderRepository.find({ where: { customer } });
  }

  public async createOrder(data: CreateOrderDto): Promise<OrderEntity> {
    const order = this._orderRepository.create(data);

    return await this._orderRepository.save(order);
  }
}
