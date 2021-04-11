import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/shared/helpers/flunt.helper';
import { BaseContract } from 'src/shared/contracts/base-contract';
import { CreateCreditCardDto } from 'src/modules/backoffice/domain/dtos/customer/create-credit-card.dto';

@Injectable()
export class CreateCreditCardContract implements BaseContract {
  errors: any[];

  validate(model: CreateCreditCardDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.holder, 5, 'Nome no cartão inválido');
    flunt.isFixedLen(model.number, 16, 'Número do cartão inválido');
    flunt.isFixedLen(model.expiration, 4, 'Data de expiração do cartão inválida');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
