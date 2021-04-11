import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/shared/helpers/flunt.helper';
import { BaseContract } from 'src/shared/contracts/base-contract';
import { UpdateCustomerDto } from 'src/modules/backoffice/domain/dtos/customer/update-customer.dto';

@Injectable()
export class UpdateCustomerContract implements BaseContract {
  errors: any[];

  validate(model: UpdateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
