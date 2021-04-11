import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/modules/backoffice/domain/dtos/pagination-query.dto';
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

    flunt.isGreaterThan(model.take, 1000, 'Busca máxima de 1000 registros');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
