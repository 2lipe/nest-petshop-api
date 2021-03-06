import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/shared/pagination/pagination-query.dto';
import { Flunt } from 'src/shared/helpers/flunt.helper';
import { BaseContract } from 'src/shared/contracts/base-contract';

@Injectable()
export class CreatePaginationContract implements BaseContract {
  errors: any[];

  validate(model: PaginationQueryDto): boolean {
    const flunt = new Flunt();

    if (!model.query) {
      model.query = {};
    }

    if (!model.keyword) {
      model.keyword = '';
    }

    flunt.isGreaterThan(model.take, 1000, 'Busca máxima de 1000 registros');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
