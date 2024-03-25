import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as yaml from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerYaml = yaml.load(`${process.cwd()}/doc/api.yaml`);
  SwaggerModule.setup('doc', app, swaggerYaml);

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
