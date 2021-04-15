import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Address } from 'src/modules/backoffice/domain/models/customer/address.model';
import { Customer } from 'src/modules/backoffice/domain/models/customer/customer.model';
import { Result } from 'src/shared/helpers/result.helper';
import { CustomerService } from 'src/modules/backoffice/application/services/customer/customer.service';

interface CustomerModel extends Customer, Document {}

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Customer')
    private readonly _customerModel: Model<CustomerModel>,
    private readonly _customerService: CustomerService,
    private readonly _httpService: HttpService,
  ) {}

  public async addBillingAddress(document: string, data: Address): Promise<Customer | undefined> {
    try {
      const options = { upsert: true };

      const customer = await this._customerService.findCustomer(document);

      await this._customerModel.updateOne(
        { document },
        {
          $set: {
            billingAddress: data,
          },
        },
        options,
      );

      return customer;
    } catch (error) {
      throw new HttpException(
        new Result('Ocorreu um erro ao cadastrar endereço de cobrança.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async addShippingAddress(document: string, data: Address): Promise<Customer | undefined> {
    try {
      const options = { upsert: true };

      const customer = await this._customerService.findCustomer(document);

      await this._customerModel.updateOne(
        { document },
        {
          $set: {
            shippingAddress: data,
          },
        },
        options,
      );

      return customer;
    } catch (error) {
      throw new HttpException(
        new Result('Ocorreu um erro ao cadastrar endereço de entrega.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAddressByZipCode(zipcode: string) {
    try {
      const url = `https://viacep.com.br/ws/${zipcode}/json/`;

      const address = await this._httpService.get(url).toPromise();

      return address;
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possível localizar seu endereço.', false, null, null),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
