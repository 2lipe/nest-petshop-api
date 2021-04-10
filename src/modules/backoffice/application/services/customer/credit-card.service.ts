import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { CreditCard } from 'src/modules/backoffice/domain/models/customer/credit-card.model';
import { Customer } from 'src/modules/backoffice/domain/models/customer/customer.model';
import { Result } from 'src/modules/backoffice/domain/models/result.model';
import { CustomerService } from 'src/modules/backoffice/application/services/customer/customer.service';

interface CustomerModel extends Customer, Document {}

@Injectable()
export class CreditCardService {
  constructor(
    @InjectModel('Customer')
    private readonly _customerModel: Model<CustomerModel>,
    private readonly _customerService: CustomerService,
  ) {}

  public async addOrUpdateCreditCard(document: string, data: CreditCard): Promise<Customer> {
    try {
      const options = { upsert: true };

      const customer = await this._customerService.findCustomer(document);

      await this._customerModel.updateOne(
        { document },
        {
          $set: {
            card: data,
          },
        },
        options,
      );

      return customer;
    } catch (error) {
      throw new HttpException(
        new Result('Ocorreu um erro ao cadastrar cartão de crédito.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
