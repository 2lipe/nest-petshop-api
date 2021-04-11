import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Address } from 'src/modules/backoffice/domain/models/customer/address.model';
import { Customer } from 'src/modules/backoffice/domain/models/customer/customer.model';
import { Result } from 'src/modules/backoffice/domain/models/result.model';
import { CustomerService } from 'src/modules/backoffice/application/services/customer/customer.service';

interface CustomerModel extends Customer, Document {}

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Customer')
    private readonly _customerModel: Model<CustomerModel>,
    private readonly _customerService: CustomerService,
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
}