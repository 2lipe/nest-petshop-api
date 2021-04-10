import { Body, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateAddressContract } from 'src/backoffice/contracts/customer/create-address.contract';
import { CreateCustomerContract } from 'src/backoffice/contracts/customer/create-customer.contract';
import { CreatePetContract } from 'src/backoffice/contracts/customer/create-pet.contract';
import { CreateAddressDto } from 'src/backoffice/dtos/create-address.dto';
import { CreateCustomerDto } from 'src/backoffice/dtos/create-customer.dto';
import { CreatePetDto } from 'src/backoffice/dtos/create-pet.dto';
import { Customer } from 'src/backoffice/models/customer.model';
import { Result } from 'src/backoffice/models/result.model';
import { User } from 'src/backoffice/models/user.model';
import { AccountService } from 'src/backoffice/services/account.service';
import { CustomerService } from 'src/backoffice/services/customer.service';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

// localhost:5000/api/v1/customers
@Controller('v1/customers')
export class CustomerController {
  constructor(private readonly _accountService: AccountService, private readonly _customerService: CustomerService) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    const user = await this._accountService.create(new User(model.document, model.password, true));

    const customer = new Customer(model.name, model.document, model.email, [], null, null, null, user);

    const res = await this._customerService.create(customer);

    return new Result('Cliente cadastrado com sucesso!', true, res, null);
  }

  @Post(':document/addresses/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document, @Body() model: CreateAddressDto) {
    await this._customerService.addBillingAddress(document, model);

    return new Result('Endereço cadastrado com sucesso!', true, model, null);
  }

  @Post(':document/addresses/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(@Param('document') document, @Body() model: CreateAddressDto) {
    await this._customerService.addShippingAddress(document, model);

    return new Result('Endereço cadastrado com sucesso!', true, model, null);
  }

  @Post(':document/pets')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async addPet(@Param('document') document, @Body() model: CreatePetDto) {
    await this._customerService.createPet(document, model);

    return new Result('Pet cadastrado com sucesso!', true, model, null);
  }

  @Put(':document/pets/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(@Param('document') document, @Param('id') id, @Body() model: CreatePetDto) {
    await this._customerService.updatePet(document, id, model);

    return new Result('Pet atualizado com sucesso!', true, model, null);
  }

  @Get()
  async getAll() {
    const res = await this._customerService.findAll();

    return new Result('Busca de clientes realizada com sucesso!', true, res, null);
  }

  @Get(':document')
  async get(@Param('document') document) {
    const res = await this._customerService.find(document);

    return new Result('Busca por cliente realizada com sucesso!', true, res, null);
  }
}
