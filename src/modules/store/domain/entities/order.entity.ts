import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/modules/store/domain/entities/abstract.entity';
import { OrderItemEntity } from 'src/modules/store/domain/entities/order-item.entity';

@Entity('orders')
export class OrderEntity extends AbstractEntity {
  @Column({ length: 8 })
  number: string;

  @Column('datetime')
  date: Date;

  @Column({ length: 11 })
  customer: string;

  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items: OrderItemEntity[];
}
