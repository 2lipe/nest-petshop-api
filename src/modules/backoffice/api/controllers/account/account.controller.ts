import { Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RoleInterceptor } from 'src/modules/auth/interceptors/role.interceptor';
import { AuthService } from 'src/modules/auth/services/auth.service';

// localhost:5000/v1/accounts
@Controller('v1/accounts')
export class AccountController {
  constructor(private _authService: AuthService) {}

  @Post('')
  async createToken(): Promise<any> {
    return await this._authService.createToken();
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor(['admin']))
  async findAll() {
    return [];
  }
}
