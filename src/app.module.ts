import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BackofficeModule } from 'src/modules/backoffice/api/backoffice.module';
import { StoreModule } from 'src/modules/store/api/store.module';
import { ProductController } from 'src/modules/store/api/controllers/product.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/petshop'),
    TypeOrmModule.forRoot(),
    BackofficeModule,
    StoreModule,
  ],
  controllers: [ProductController],
})
export class AppModule {}
