import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddressController } from 'src/modules/backoffice/api/controllers/customer/address.controller';
import { CustomerController } from 'src/modules/backoffice/api/controllers/customer/customer.controller';
import { PetController } from 'src/modules/backoffice/api/controllers/customer/pet.controller';
import { CustomerSchema } from 'src/modules/backoffice/infrastructure/schemas/customer.schema';
import { UserSchema } from 'src/modules/backoffice/infrastructure/schemas/user.schema';
import { AccountService } from 'src/modules/backoffice/application/services/account/account.service';
import { AddressService } from 'src/modules/backoffice/application/services/customer/address.service';
import { CustomerService } from 'src/modules/backoffice/application/services/customer/customer.service';
import { PetService } from 'src/modules/backoffice/application/services/customer/pet.service';

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
