import { Column, Entity } from 'typeorm';
import { AbstractEntity } from 'src/modules/store/domain/entities/abstract.entity';

@Entity('products')
export class ProductEntity extends AbstractEntity {
  @Column({ length: 80 })
  title: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column('decimal')
  quantityOnHand: number;
}
