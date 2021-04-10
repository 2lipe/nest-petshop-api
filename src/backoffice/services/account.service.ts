import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';

interface UserModel extends User, Document {}

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly _userModel: Model<UserModel>,
  ) {}

  public async create(data: User): Promise<User> {
    try {
      const user = new this._userModel(data);

      const newUser = await user.save();

      return newUser;
    } catch (error) {
      throw new HttpException(
        new Result(
          'Ocorreu um erro ao realizar o cadastro de usuário',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // public update(data: User) {
  //   const user = new this._userModel(data);
  // }
}
