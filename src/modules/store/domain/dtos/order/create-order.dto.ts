import { OrderItemEntity } from 'src/modules/store/domain/entities/order-item.entity';

export class CreateOrderDto {
  constructor(public number: string, public date: Date, public customer: string, public items: OrderItemEntity[]) {}
}
