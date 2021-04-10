import { Injectable } from '@nestjs/common';
import { CreatePetDto } from 'src/backoffice/dtos/create-pet.dto';
import { Flunt } from 'src/helpers/flunt.helper';
import { Contract } from '../contract';

@Injectable()
export class CreatePetContract implements Contract {
  errors: any[];

  validate(model: CreatePetDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 2, 'Nome inválido');
    flunt.hasMinLen(model.gender, 3, 'Gênero inválido');
    flunt.hasMinLen(model.kind, 3, 'Tipo inválido');
    flunt.hasMinLen(model.brand, 3, 'Raça inválida');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
