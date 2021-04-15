import 'dotenv/config';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { CustomLogger } from 'src/shared/loggers/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });

  app.use(compression());
  app.setGlobalPrefix('api');

  // Open API (Swagger)
  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API do projeto petshop')
    .setVersion('1.0.0')
    .addTag('petshop')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
