import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from 'src/backoffice/dtos/create-address.dto';
import { Flunt } from 'src/helpers/flunt.helper';
import { Contract } from '../contract';

@Injectable()
export class CreateAddressContract implements Contract {
  errors: any[];

  validate(model: CreateAddressDto): boolean {
    const flunt = new Flunt();

    flunt.isFixedLen(model.zipCode, 8, 'CEP inválido');
    flunt.hasMinLen(model.street, 1, 'Rua inválida');
    flunt.hasMinLen(model.neighborhood, 2, 'Bairro inválido');
    flunt.hasMinLen(model.city, 3, 'Cidade inválida');
    flunt.isFixedLen(model.state, 2, 'Estado inválido');
    flunt.isFixedLen(model.country, 3, 'País inválido');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
