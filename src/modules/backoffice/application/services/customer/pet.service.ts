import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Customer } from 'src/modules/backoffice/domain/models/customer/customer.model';
import { Pet } from 'src/modules/backoffice/domain/models/customer/pet.model';
import { Result } from 'src/shared/result/result';
import { CustomerService } from 'src/modules/backoffice/application/services/customer/customer.service';

interface CustomerModel extends Customer, Document {}

@Injectable()
export class PetService {
  constructor(
    @InjectModel('Customer')
    private readonly _customerModel: Model<CustomerModel>,
    private readonly _customerService: CustomerService,
  ) {}

  public async createPet(document: string, data: Pet): Promise<Customer> {
    try {
      const options = { upsert: true, new: true };

      const customer = await this._customerService.findCustomer(document);

      await this._customerModel.updateOne(
        { document },
        {
          $push: {
            pets: data,
          },
        },
        options,
      );

      return customer;
    } catch (error) {
      throw new HttpException(
        new Result('Ocorreu um erro ao cadastrar pet.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async updatePet(document: string, id: string, data: Pet): Promise<Customer> {
    try {
      const customerPet = await this._findCustomerPet(document, id);

      await this._customerModel.updateOne(
        { document, 'pets._id': id },
        {
          $set: {
            //$ busca o index do pet no mongo, atualiza o objeto do index
            'pets.$': data,
          },
        },
      );

      return customerPet;
    } catch (error) {
      throw new HttpException(
        new Result('Ocorreu um erro ao atualizar pet.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async _findCustomerPet(document: string, id: string): Promise<Customer | undefined> {
    try {
      const customer = await this._customerService.findCustomer(document);

      const customerPet = await this._customerModel.findOne({
        document: customer.document,
        'pets._id': id,
      });

      if (!customerPet) {
        throw new NotFoundException();
      }

      return customerPet;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('Pet não encontrado');
      }

      throw new HttpException(new Result('Ocorreu um erro ao buscar pet', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }
}
