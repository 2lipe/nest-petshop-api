import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RoleInterceptor } from 'src/modules/auth/interceptors/role.interceptor';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { AccountService } from 'src/modules/backoffice/application/services/account/account.service';
import { AuthenticateDto } from 'src/modules/backoffice/domain/dtos/account/authenticate.dto';
import { Result } from 'src/shared/helpers/result.helper';

// localhost:5000/v1/accounts
@Controller('v1/accounts')
export class AccountController {
  constructor(private _authService: AuthService, private _accountService: AccountService) {}

  @Post('authenticate')
  async autheticate(@Body() data: AuthenticateDto): Promise<any> {
    const customer = await this._accountService.authenticate(data.username, data.password);

    if (!customer) {
      throw new HttpException(new Result('Usuário ou senha inválidos', false, null, null), HttpStatus.BAD_REQUEST);
    }

    if (!customer.user.active) {
      throw new HttpException(new Result('Usuário inativo', false, null, null), HttpStatus.FORBIDDEN);
    }

    const token = await this._authService.createToken(customer.document, customer.email, '', customer.user.roles);

    return new Result('Usuário autenticado com sucesso!', true, token, null);
  }
}
