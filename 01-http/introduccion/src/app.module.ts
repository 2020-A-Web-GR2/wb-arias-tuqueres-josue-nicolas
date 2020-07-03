import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/juego-module";

@Module({
  imports: [
      //Aqui otros módulos
      HttpJuegoModule
  ],
  controllers: [
      //Controladores de APP MODULE
      AppController],
  providers: [
      //Servicios de APP MODULE
      AppService],
})
export class AppModule {}
