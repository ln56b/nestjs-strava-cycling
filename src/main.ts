import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
