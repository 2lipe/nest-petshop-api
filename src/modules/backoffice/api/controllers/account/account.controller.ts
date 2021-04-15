import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
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
  async findAll() {
    return [];
  }
}
