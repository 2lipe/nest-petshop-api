import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { AccountService } from 'src/modules/backoffice/application/services/account/account.service';

@Module({
  providers: [AuthService, AccountService, JwtService],
})
export class AuthModule {}
