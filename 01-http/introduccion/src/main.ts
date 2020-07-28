import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Importar cosas en TS
const cookieParser = require('cookie-parser') //Importar cosas en JS


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
      /*
      * AQUI CONFIGURACION
      * ANTES DEL APP.LISTEN()
      */
      // await app.listen(3001);
    app.use(cookieParser("Codigo secreto de la cookie firmada"));
    await app.listen(3001);
}
bootstrap();
