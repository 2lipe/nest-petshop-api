import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { CreateCustomerContract } from 'src/modules/backoffice/contracts/customer/create-customer.contract';
import { CreatePaginationContract } from 'src/modules/backoffice/contracts/customer/create-pagination.contract';
import { CreateCustomerDto } from 'src/modules/backoffice/dtos/create-customer.dto';
import { PaginationQueryDto } from 'src/modules/backoffice/dtos/pagination-query.dto';
import { Customer } from 'src/modules/backoffice/models/customer.model';
import { Result } from 'src/modules/backoffice/models/result.model';
import { User } from 'src/modules/backoffice/models/user.model';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { CustomerService } from 'src/modules/backoffice/services/customer.service';
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

  @Post('query')
  @UseInterceptors(new ValidatorInterceptor(new CreatePaginationContract()))
  async query(@Body() model: PaginationQueryDto) {
    const res = await this._customerService.query(model);

    return new Result('Busca por clientes realizada com sucesso!', true, res, null);
  }
}
