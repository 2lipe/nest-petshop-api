import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddressController } from './controllers/customer/address.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { PetController } from './controllers/customer/pet.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { AddressService } from './services/address.service';
import { CustomerService } from './services/customer.service';
import { PetService } from './services/pet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AddressController, PetController, CustomerController],
  providers: [AccountService, AddressService, PetService, CustomerService],
})
export class BackofficeModule {}
