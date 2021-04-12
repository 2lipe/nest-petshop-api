import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { UpdateCustomerDto } from 'src/modules/backoffice/domain/dtos/customer/update-customer.dto';
import { PaginationQueryDto } from 'src/shared/pagination/pagination-query.dto';
import { Customer } from 'src/modules/backoffice/domain/models/customer/customer.model';
import { Result } from 'src/shared/helpers/result.helper';

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

  public async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
    try {
      const customer = await this.findCustomer(document);

      if (!customer) {
        throw new NotFoundException();
      }

      await this._customerModel.update({ document }, data);

      return customer;
    } catch (error) {
      throw new HttpException(
        new Result('Ocorreu um erro ao atualizar cliente', false, null, error),
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

  public async findCustomer(document: string): Promise<Customer | undefined> {
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
}
