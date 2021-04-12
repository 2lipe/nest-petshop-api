import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/modules/store/domain/entities/abstract.entity';
import { OrderEntity } from 'src/modules/store/domain/entities/order.entity';
import { ProductEntity } from 'src/modules/store/domain/entities/product.entity';

@Entity('order_items')
export class OrderItemEntity extends AbstractEntity {
  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product)
  product: ProductEntity;

  @Column('decimal')
  price: number;

  @Column('decimal')
  quantity: number;
}
