import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';
import { Result } from '../models/result.model';

interface CustomerModel extends Customer, Document {}

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer')
    private readonly _customerModel: Model<CustomerModel>,
  ) {}

  public async create(data: Customer): Promise<Customer> {
    try {
      const customer = new this._customerModel(data);

      const newCustomer = await customer.save();

      return newCustomer;
    } catch (error) {
      throw new HttpException(
        new Result(
          'Ocorreu um erro ao realizar o cadastro do cliente.',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async addBillingAddress(
    document: string,
    data: Address,
  ): Promise<Customer | undefined> {
    try {
      const options = { upsert: true };

      const customer = await this._customerModel.findOne({ document });

      if (!customer) {
        throw new NotFoundException();
      }

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
      if ((error.status = HttpStatus.NOT_FOUND)) {
        throw new NotFoundException(
          new Result('Usuário não encontrado.', false, null, error),
        );
      }

      throw new HttpException(
        new Result(
          'Ocorreu um erro ao atualizar endereço do cliente',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async addShippingAddress(
    document: string,
    data: Address,
  ): Promise<Customer | undefined> {
    try {
      const options = { upsert: true };

      const customer = await this._customerModel.findOne({ document });

      if (!customer) {
        throw new NotFoundException();
      }

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
      if ((error.status = HttpStatus.NOT_FOUND)) {
        throw new NotFoundException(
          new Result('Usuário não encontrado.', false, null, error),
        );
      }

      throw new HttpException(
        new Result(
          'Ocorreu um erro ao atualizar endereço do cliente',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
