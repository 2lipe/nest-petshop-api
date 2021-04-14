import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// localhost:5000/v1/accounts
@Controller('v1/accounts')
export class AccountController {
  constructor() {}

  @Get('')
  @UseGuards(AuthGuard())
  async findAll() {
    return [];
  }
}
