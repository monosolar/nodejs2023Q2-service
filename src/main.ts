import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// console.log('\x1b[33m Welcome to the app! \x1b[0m');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT, () =>
    console.log(
      '\x1b[36m%s\x1b[0m',
      '--->',
      'Server started',
      process.env.PORT,
    ),
  );
}
bootstrap();
