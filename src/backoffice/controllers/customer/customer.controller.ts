import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCustomerContract } from 'src/backoffice/contracts/customer.contracts';
import { CreateCustomerDto } from 'src/backoffice/dtos/create-customer.dto';
import { Customer } from 'src/backoffice/models/customer.model';
import { Result } from 'src/backoffice/models/result.model';
import { User } from 'src/backoffice/models/user.model';
import { AccountService } from 'src/backoffice/services/account.service';
import { CustomerService } from 'src/backoffice/services/customer.service';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';

// localhost:5000/api/v1/customers
@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly _accountService: AccountService,
    private readonly _customerService: CustomerService,
  ) {}

  @Get()
  get() {
    return new Result(null, true, [], null);
  }

  @Get(':document')
  getById(@Param('document') document) {
    return new Result(null, true, {}, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDto) {
    const user = await this._accountService.create(
      new User(model.document, model.password, true),
    );

    const customer = new Customer(
      model.name,
      model.document,
      model.email,
      null,
      null,
      null,
      null,
      user,
    );

    const res = await this._customerService.create(customer);

    return new Result('Cliente cadastrado com sucesso!', true, res, null);
  }

  @Put(':document')
  put(@Param('document') document, @Body() body) {
    return new Result('Cliente alterado com sucesso', true, body, null);
  }

  @Delete(':document')
  delete(@Param('document') document) {
    return new Result('Cliente removido com sucesso', true, null, null);
  }
}
