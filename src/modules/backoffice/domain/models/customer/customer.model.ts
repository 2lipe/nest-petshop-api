import { Address } from 'src/modules/backoffice/domain/models/customer/address.model';
import { CreditCard } from 'src/modules/backoffice/domain/models/customer/credit-card.model';
import { Pet } from 'src/modules/backoffice/domain/models/customer/pet.model';
import { User } from 'src/modules/backoffice/domain/models/user.model';

export class Customer {
  constructor(
    public name: string,
    public document: string,
    public email: string,
    public pets: Pet[],
    public billingAddress: Address,
    public shippingAddress: Address,
    public creditCard: CreditCard,
    public user: User,
  ) {}
}
