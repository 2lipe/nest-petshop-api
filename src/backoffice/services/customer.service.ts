import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
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
}
