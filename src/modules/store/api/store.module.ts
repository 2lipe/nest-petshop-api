import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from 'src/modules/store/application/services/product.service';
import { ProductEntity } from 'src/modules/store/domain/entities/product.entity';
import { ProductController } from 'src/modules/store/api/controllers/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class StoreModule {}
