import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IJwtPayload } from 'src/modules/auth/interfaces/jwt-payload.interface';
import { UserModel } from 'src/modules/backoffice/application/services/account/account.service';
//import { User } from 'src/modules/backoffice/domain/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly _userModel: Model<UserModel>,
    private readonly _jwtService: JwtService,
  ) {}

  public async createToken(document: string, email: string, image: string, roles: string[]) {
    const user: IJwtPayload = {
      document: document,
      email: email,
      image: image,
      roles: roles,
    };

    return this._jwtService.sign(user);
  }

  public async validateUser(payload: IJwtPayload): Promise<any> {
    return payload;

    // const user = await this._findOneByUsername(payload.document); (Ler a role do banco)
  }

  // private async _findOneByUsername(username: string) {
  //   return new User(username, '123456789', true);
  // }
}
