import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from 'src/modules/store/application/services/product.service';
import { ProductEntity } from 'src/modules/store/domain/entities/product.entity';
import { ProductController } from 'src/modules/store/api/controllers/product.controller';
import { OrderService } from 'src/modules/store/application/services/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductService, OrderService],
  controllers: [ProductController],
})
export class StoreModule {}
