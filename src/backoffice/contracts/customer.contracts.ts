import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/helpers/flunt';
import { Customer } from '../models/customer.model';
import { Contract } from './contract';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: any[];

  validate(model: Customer): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido.');
    flunt.isEmail(model.email, 'Email inválido.');
    flunt.isFixedLen(model.document, 11, 'CPF inválido.');
    flunt.hasMinLen(model.password, 6, 'Senha inválida.');

    flunt.hasMinLen(model.creditCard.number, 16, 'Numero inválido');
    flunt.hasMaxLen(model.creditCard.number, 16, 'Numero inválido');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
