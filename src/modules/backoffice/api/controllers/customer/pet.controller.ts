import { Body, Controller, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreatePetContract } from 'src/modules/backoffice/domain/contracts/customer/create-pet.contract';
import { CreatePetDto } from 'src/modules/backoffice/domain/dtos/customer/create-pet.dto';
import { Result } from 'src/shared/result/result';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { PetService } from 'src/modules/backoffice/application/services/customer/pet.service';

// localhost:5000/api/v1/pets
@Controller('v1/pets')
export class PetController {
  constructor(private readonly _petService: PetService) {}

  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async addPet(@Param('document') document, @Body() model: CreatePetDto) {
    await this._petService.createPet(document, model);

    return new Result('Pet cadastrado com sucesso!', true, model, null);
  }

  @Put(':document/:id')
  @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
  async updatePet(@Param('document') document, @Param('id') id, @Body() model: CreatePetDto) {
    await this._petService.updatePet(document, id, model);

    return new Result('Pet atualizado com sucesso!', true, model, null);
  }
}
