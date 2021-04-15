import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AddressController } from 'src/modules/backoffice/api/controllers/customer/address.controller';
import { CustomerController } from 'src/modules/backoffice/api/controllers/customer/customer.controller';
import { PetController } from 'src/modules/backoffice/api/controllers/customer/pet.controller';
import { AccountController } from 'src/modules/backoffice/api/controllers/account/account.controller';
import { CustomerSchema } from 'src/modules/backoffice/infrastructure/schemas/customer.schema';
import { UserSchema } from 'src/modules/backoffice/infrastructure/schemas/user.schema';
import { AccountService } from 'src/modules/backoffice/application/services/account/account.service';
import { AddressService } from 'src/modules/backoffice/application/services/customer/address.service';
import { CustomerService } from 'src/modules/backoffice/application/services/customer/customer.service';
import { PetService } from 'src/modules/backoffice/application/services/customer/pet.service';
import { CreditCardController } from 'src/modules/backoffice/api/controllers/customer/credit-card.controller';
import { CreditCardService } from 'src/modules/backoffice/application/services/customer/credit-card.service';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    HttpModule,
    CacheModule.register(),
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
    AuthModule,
  ],
  controllers: [AccountController, AddressController, PetController, CreditCardController, CustomerController],
  providers: [AccountService, AddressService, PetService, CreditCardService, CustomerService],
})
export class BackofficeModule {}
