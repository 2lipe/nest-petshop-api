import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User } from '../models/user.model';

interface UserModel extends User, Document {}

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly _userModel: Model<UserModel>,
  ) {}

  public async create(data: User): Promise<User> {
    const user = new this._userModel(data);

    const newUser = await user.save();

    return newUser;
  }

  public update(data: User) {
    const user = new this._userModel(data);
  }
}
