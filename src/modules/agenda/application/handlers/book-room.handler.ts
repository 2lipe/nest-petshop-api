import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookRoomCommand } from 'src/modules/agenda/domain/commands/book-room.command';
import { RoomRepository } from 'src/modules/agenda/infraestructure/repositories/room.repository';

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
  constructor(private readonly _roomRepository: RoomRepository) {}

  public async execute(command: BookRoomCommand): Promise<any> {
    console.log('BookRoomHandler:execute - Executando o comando...');

    const room = await this._roomRepository.findOneById(command.roomId);

    room.book(command.customerId);
    //room.commit();
  }
}
