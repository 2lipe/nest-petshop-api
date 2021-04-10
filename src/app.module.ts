import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BackofficeModule } from 'src/modules/backoffice/api/backoffice.module';
import { StoreModule } from 'src/modules/store/store.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/petshop'), BackofficeModule, StoreModule],
  controllers: [],
})
export class AppModule {}
