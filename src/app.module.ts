import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BackofficeModule } from 'src/modules/backoffice/api/backoffice.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/petshop'), BackofficeModule],
  controllers: [],
})
export class AppModule {}
