import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Md5 } from 'md5-typescript';
import { Result } from 'src/shared/helpers/result.helper';
import { User } from 'src/modules/backoffice/domain/models/user.model';
import { Customer } from 'src/modules/backoffice/domain/models/customer/customer.model';

export interface UserModel extends User, Document {}
interface CustomerModel extends Customer, Document {}

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly _userModel: Model<UserModel>,
    @InjectModel('Customer') private readonly _customerModel: Model<CustomerModel>,
  ) {}

  public async create(data: User): Promise<User> {
    try {
      const user = new this._userModel(data);

      const newUser = await user.save();

      return newUser;
    } catch (error) {
      throw new HttpException(
        new Result('Ocorreu um erro ao realizar o cadastro de usuário', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async update(username: string, data: any): Promise<User> {
    try {
      const user = await this._userModel.findOne({ username });

      if (!user) {
        throw new NotFoundException();
      }

      await this._customerModel.update({ username }, data);

      return user;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(new Result('Nenhum usuário encontrado.', false, null, error));
      }

      throw new HttpException(
        new Result('Ocorreu um erro ao atualizar dados usuario.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async authenticate(username: string, password: string): Promise<Customer> {
    try {
      const customer = await this._customerModel
        .findOne({
          'user.username': username,
        })
        .populate('user', '-password')
        .exec();

      if (!customer.user.active) {
        throw new HttpException(new Result('Usuário inativo.', false, null, null), HttpStatus.UNAUTHORIZED);
      }

      const pass = Md5.init(`${password}${process.env.SALT_KEY}`);
      if (pass.toString() === customer.user.password.toString()) {
        return customer;
      } else {
        throw new HttpException(new Result('Usuário ou senha inválidos.', false, null, null), HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        new Result('Houve um erro ao realizar a autenticação.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
