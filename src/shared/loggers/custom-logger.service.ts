import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  public log(message: string) {
    console.log(message);
  }

  public error(message: string, trace?: string) {
    console.log(message);
  }

  public warn(message: string) {
    console.log(message);
  }

  public debug?(message: string) {
    console.log(message);
  }

  public verbose?(message: string) {
    console.log(message);
  }
}
