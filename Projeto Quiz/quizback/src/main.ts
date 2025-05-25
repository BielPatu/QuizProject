import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        
    forbidNonWhitelisted: true, 
    transform: true,        
  }));
app.enableCors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization, Accept',
});



  await app.listen(5000);
}
bootstrap();

