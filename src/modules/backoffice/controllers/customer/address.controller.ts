import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { CreateAddressContract } from 'src/modules/backoffice/contracts/customer/create-address.contract';
import { Result } from 'src/modules/backoffice/models/result.model';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { AddressService } from 'src/modules/backoffice/services/address.service';
import { CreateAddressDto } from 'src/modules/backoffice/dtos/create-address.dto';

// localhost:5000/api/v1/addresses
@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly _addressService: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document, @Body() model: CreateAddressDto) {
    await this._addressService.addBillingAddress(document, model);

    return new Result('Endereço cadastrado com sucesso!', true, model, null);
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(@Param('document') document, @Body() model: CreateAddressDto) {
    await this._addressService.addShippingAddress(document, model);

    return new Result('Endereço cadastrado com sucesso!', true, model, null);
  }
}
