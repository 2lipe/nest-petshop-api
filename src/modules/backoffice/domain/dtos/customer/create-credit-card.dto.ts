export class CreateCreditCardDto {
  constructor(public holder: string, public number: string, public expiration: string) {}
}
