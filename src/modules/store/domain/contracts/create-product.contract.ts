import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/shared/helpers/flunt.helper';
import { BaseContract } from 'src/shared/contracts/base-contract';
import { CreateProductDto } from 'src/modules/store/domain/dtos/product/create-product.dto';

@Injectable()
export class CreateProductContract implements BaseContract {
  errors: any[];

  validate(model: CreateProductDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.title, 3, 'Título do produto inválido');
    flunt.hasMinLen(model.description, 5, 'Descrição inválida');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
