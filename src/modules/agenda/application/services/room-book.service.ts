import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BookRoomCommand } from 'src/modules/agenda/domain/commands/book-room.command';

@Injectable()
export class RoomBookService {
  constructor(private readonly _commandBus: CommandBus) {}

  public async Book(customerId: string, roomId: string) {
    console.log('RoomBookService:Book - Executando o serviço...');

    return await this._commandBus.execute(new BookRoomCommand(customerId, roomId));
  }
}
