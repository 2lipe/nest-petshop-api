import { OrderEntity } from 'src/modules/store/domain/entities/order.entity';
import { ProductEntity } from 'src/modules/store/domain/entities/product.entity';

export class CreateOrderItemDto {
  constructor(
    public order: OrderEntity,
    public product: ProductEntity,
    public price: number,
    public quantity: number,
  ) {}
}
