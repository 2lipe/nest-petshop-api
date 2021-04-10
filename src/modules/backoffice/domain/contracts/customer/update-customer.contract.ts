import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/helpers/flunt.helper';
import { Contract } from 'src/modules/backoffice/domain/contracts/contract';
import { UpdateCustomerDto } from 'src/modules/backoffice/domain/dtos/customer/update-customer.dto';

@Injectable()
export class UpdateCustomerContract implements Contract {
  errors: any[];

  validate(model: UpdateCustomerDto): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');

    this.errors = flunt.errors;

    return flunt.isValid();
  }
}
