import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
        .setTitle('Purrweb')
        .setDescription('CRUD nest js')
        .setVersion('1.0.0')
        .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
