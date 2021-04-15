import { AggregateRoot } from '@nestjs/cqrs';

export class Room extends AggregateRoot {
  constructor(private readonly _id: string) {
    super();
  }

  public book(customerId: string) {}
}
