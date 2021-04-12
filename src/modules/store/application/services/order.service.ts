import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/modules/store/domain/entities/order.entity';
import { CreateOrderDto } from 'src/modules/store/domain/dtos/order/create-order.dto';
import { Result } from 'src/shared/helpers/result.helper';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) private readonly _orderRepository: Repository<OrderEntity>) {}

  public async createOrder(data: CreateOrderDto): Promise<OrderEntity> {
    try {
      const order = this._orderRepository.create(data);

      await this._orderRepository.save(order);

      return order;
    } catch (error) {
      throw new HttpException(
        new Result('Ocorreu um erro ao cadastrar pedido.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getByNumber(number: string): Promise<OrderEntity> {
    return await this._orderRepository.findOne({ where: { number } });
  }

  public async getByCustomer(customer: string): Promise<OrderEntity[]> {
    return await this._orderRepository.find({ where: { customer } });
  }
}
