import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/juego-module";
import {HttpCalculadoraModule} from "./Deber1/calculadora-module";

@Module({
  imports: [
      //Aqui otros módulos
      HttpJuegoModule,
      HttpCalculadoraModule
  ],
  controllers: [
      //Controladores de APP MODULE
      AppController,],
  providers: [
      //Servicios de APP MODULE
      AppService],
})
export class AppModule {}
