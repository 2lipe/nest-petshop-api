import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { CustomLogger } from 'src/shared/loggers/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}
bootstrap();
