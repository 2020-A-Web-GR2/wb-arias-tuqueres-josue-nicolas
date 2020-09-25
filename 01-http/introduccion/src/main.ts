import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Importar cosas en TS
const cookieParser = require('cookie-parser') //Importar cosas en JS
const express = require("express")
const session = require('express-session');
const FileStore = require('session-file-store')(session);


async function bootstrap() {
    const app = await NestFactory.create(AppModule) as any;
      /*
      * AQUI CONFIGURACION
      * ANTES DEL APP.LISTEN()
      */
      // await app.listen(3001);
    app.use(cookieParser("Codigo secreto de la cookie firmada"));
    app.set("view engine", "ejs")
    app.use(express.static("publico"))
    app.use(
        session(
            {
                name: 'server-session-id',
                secret: 'No sera de tomar un traguito',
                resave: true,
                saveUnitialized: true,
                cookie: {secure:false},
                store: new FileStore(),
            }
        ),
    );


    await app.listen(3001);
}
bootstrap();
