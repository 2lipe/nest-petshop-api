import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/modules/backoffice/application/services/account/account.service';
import { IJwtPayload } from 'src/modules/auth/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly _accountService: AccountService, private readonly _jwtService: JwtService) {}

  public async createToken() {
    const user: IJwtPayload = { username: 'teste@email.com' };
    const accessToken = this._jwtService.sign(user);

    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  public async validateUser(payload: IJwtPayload): Promise<any> {
    return await this._accountService.findOneByUsername(payload.username);
  }
}
