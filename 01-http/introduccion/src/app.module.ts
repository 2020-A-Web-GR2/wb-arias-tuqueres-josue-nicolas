import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/juego-module";
import {HttpCalculadoraModule} from "./Deber1/calculadora-module";
import {usuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [
      //Aqui otros módulos
      HttpJuegoModule,
      HttpCalculadoraModule,

      usuarioModule,
      TypeOrmModule
          .forRoot({
              name:'default', //nombre de la conexion
              type: 'mysql', //mysql postgres
              host: 'localhost', //ip
              port: 3306, //puerto
              username: 'root', //usuario
              password: 'narias', //password
              database: 'ejemplo', //base de datos
              entities: [//todas las entidades
                UsuarioEntity
              ],
              synchronize: true, //Actualiza el esquema de la base de datos
              dropSchema: false, //Eliminar Datos y el Esquema de base de datos
          }),
  ],
  controllers: [
      //Controladores de APP MODULE
      AppController,],
  providers: [
      //Servicios de APP MODULE
      AppService],
})
export class AppModule {}
