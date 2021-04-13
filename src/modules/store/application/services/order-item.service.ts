import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemEntity } from 'src/modules/store/domain/entities/order-item.entity';
import { CreateOrderItemDto } from 'src/modules/store/domain/dtos/order/create-order-item.dto';
import { Result } from 'src/shared/helpers/result.helper';

@Injectable()
export class OrderItemService {
  constructor(@InjectRepository(OrderItemEntity) private readonly _orderItemRepository: Repository<OrderItemEntity>) {}

  public async addOrderItem(item: CreateOrderItemDto) {
    try {
      const orderItem = this._orderItemRepository.create(item);

      await this._orderItemRepository.save(orderItem);

      return orderItem;
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível inserir item do pedido', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
