import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';
import { Pet } from '../models/pet.model';
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
        new Result('Ocorreu um erro ao realizar o cadastro do cliente.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async addBillingAddress(document: string, data: Address): Promise<Customer | undefined> {
    try {
      const options = { upsert: true };

      const customer = await this._findCustomer(document);

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

      const customer = await this._findCustomer(document);

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

  public async createPet(document: string, data: Pet): Promise<Customer> {
    try {
      const options = { upsert: true, new: true };

      const customer = await this._findCustomer(document);

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

  public async findAll(): Promise<Customer[]> {
    try {
      // Caso queira buscar todos menos algum campo Ex: ('-name').exec(), em branco tras todas as informações
      const customers = await this._customerModel.find({}, 'name email document').sort('name').exec();

      if (customers.length === 0) {
        throw new NotFoundException();
      }

      return customers;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(new Result('Nenhum cliente encontrado', false, null, error));
      }

      throw new HttpException(
        new Result('Ocorreu um erro ao buscar clientes', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async find(document: string): Promise<Customer> {
    try {
      const customer = await this._customerModel.findOne({ document }).populate('user', 'username').exec();

      if (!customer) {
        throw new NotFoundException();
      }

      return customer;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(new Result('Nenhum cliente encontrado', false, null, error));
      }

      throw new HttpException(
        new Result('Ocorreu um erro ao buscar cliente', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async query(model: PaginationQueryDto): Promise<Customer[]> {
    try {
      const customers = await this._customerModel
        .find(model.query, model.fields, {
          skip: model.skip,
          limit: model.take,
        })
        .sort(model.sort)
        .exec();

      if (customers.length === 0) {
        throw new NotFoundException();
      }

      return customers;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(new Result('Nenhum cliente encontrado', false, null, error));
      }

      throw new HttpException(
        new Result('Ocorreu um erro ao buscar clientes', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async _findCustomer(document: string): Promise<Customer | undefined> {
    try {
      const customer = await this._customerModel.findOne({ document });

      if (!customer) {
        throw new NotFoundException();
      }

      return customer;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException('Cliente não encontrado');
      }

      throw new HttpException(
        new Result('Ocorreu um erro ao buscar cliente', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async _findCustomerPet(document: string, id: string): Promise<Customer | undefined> {
    try {
      const customer = await this._findCustomer(document);

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
