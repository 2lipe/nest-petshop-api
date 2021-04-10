import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/backoffice/dtos/pagination-query.dto';
import { Flunt } from 'src/helpers/flunt.helper';
import { Contract } from '../contract';

@Injectable()
export class CreatePaginationContract implements Contract {
  errors: any[];

  validate(model: PaginationQueryDto): boolean {
    const flunt = new Flunt();

    flunt.hasMaxLen(model.take, 1000, 'Busca máxima de 1000 registros');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
