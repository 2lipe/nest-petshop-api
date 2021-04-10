import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Customer } from '../models/customer.model';

interface CustomerModel extends Customer, Document {}

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer')
    private readonly _customerModel: Model<CustomerModel>,
  ) {}
}
