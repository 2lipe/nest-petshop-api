import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/modules/store/domain/entities/product.entity';
import { OrderEntity } from 'src/modules/store/domain/entities/order.entity';
import { ProductService } from 'src/modules/store/application/services/product.service';
import { OrderService } from 'src/modules/store/application/services/order.service';
import { ProductController } from 'src/modules/store/api/controllers/product.controller';
import { OrderController } from 'src/modules/store/api/controllers/order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, OrderEntity])],
  providers: [ProductService, OrderService],
  controllers: [ProductController, OrderController],
})
export class StoreModule {}
