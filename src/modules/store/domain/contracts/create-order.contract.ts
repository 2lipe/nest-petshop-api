import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/shared/helpers/flunt.helper';
import { BaseContract } from 'src/shared/contracts/base-contract';
import { CreateOrderDto } from 'src/modules/store/domain/dtos/order/create-order.dto';

@Injectable()
export class CreateOrderContract implements BaseContract {
  errors: any[];

  validate(model: CreateOrderDto): boolean {
    const flunt = new Flunt();

    if (!model.date) {
      model.date = new Date();
    }

    flunt.hasMinLen(model.number, 1, 'Número do pedido inválido.');
    flunt.isRequired(model.items, 'O pedido precisa possui algum item.');
    flunt.hasMinLen(model.customer, 11, 'CPF do cliente inválido.');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
