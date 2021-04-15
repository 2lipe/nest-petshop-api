import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BackofficeModule } from 'src/modules/backoffice/api/backoffice.module';
import { StoreModule } from 'src/modules/store/api/store.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AgendaModule } from 'src/modules/agenda/agenda.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    TypeOrmModule.forRoot(),
    BackofficeModule,
    StoreModule,
    AuthModule,
    AgendaModule,
  ],
})
export class AppModule {}
