import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { Result } from 'src/shared/result/result';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreditCardService } from 'src/modules/backoffice/application/services/customer/credit-card.service';
import { CreateCreditCardContract } from 'src/modules/backoffice/domain/contracts/customer/create-credit-card.contract';
import { CreateCreditCardDto } from 'src/modules/backoffice/domain/dtos/customer/create-credit-card.dto';

// localhost:5000/api/v1/credit-cards
@Controller('v1/credit-cards')
export class CreditCardController {
  constructor(private readonly _creditCardService: CreditCardService) {}

  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async createBilling(@Param('document') document, @Body() model: CreateCreditCardDto) {
    await this._creditCardService.addOrUpdateCreditCard(document, model);

    return new Result('Cartão de credito adicionado com sucesso!', true, model, null);
  }
}
