import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BackofficeModule } from './backoffice/backoffice.module';
import { ServicesService } from './customer/backoffice/services/services.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/petshop'),
    BackofficeModule,
  ],
  controllers: [],
  providers: [ServicesService],
})
export class AppModule {}
