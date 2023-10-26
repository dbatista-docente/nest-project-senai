import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, { cors: true });

  // Crie uma instância express
  const expressApp = express();

  // Aumente o limite de tamanho de carga 
  expressApp.use(bodyParser.json({ limit: '100gb' }));
  expressApp.use(bodyParser.urlencoded({ limit: '100gb', extended: true }));

  // Configure o express como middleware para o aplicativo Nest.js
  app.use(expressApp);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nest-Project')
    .setVersion('1.0.0')
    .addServer('http://localhost:3000', 'Local')
    .addTag('Status')
    .addTag('Auth')
    .addTag('User')
    .addTag('Telegram')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);

  console.log('http://localhost:' + port + '/docs');
}

bootstrap();
