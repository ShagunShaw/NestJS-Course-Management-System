import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  console.log("So now our final route prefix became localhost:3000/api/v1")

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
