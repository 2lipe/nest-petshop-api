import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/helpers/flunt.helper';
import { CreateCustomerDto } from '../../dtos/create-customer.dto';
import { Contract } from '../contract';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: any[];

  validate(model: CreateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido mínimo 5 caracteres.');
    flunt.isEmail(model.email, 'Email inválido.');
    flunt.isFixedLen(model.document, 11, 'CPF inválido.');
    flunt.hasMinLen(model.password, 6, 'Senha inválida mínimo 6 caracteres.');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
