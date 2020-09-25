import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/juego-module";
import {HttpCalculadoraModule} from "./Deber1/calculadora-module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaEntity} from "./mascota/mascota.entity";
import {VacunaEntity} from "./vacuna/vacuna.entity";
import {MascotaModule} from "./mascota/mascota.module";
import {VacunaModule} from "./vacuna/vacuna.module";

@Module({
  imports: [
      //Aqui otros módulos
      HttpJuegoModule,
      HttpCalculadoraModule,
      UsuarioModule,
      MascotaModule,
      VacunaModule,
      TypeOrmModule
          .forRoot({
              name:'default', //nombre de la conexion
              type: 'mysql', //mysql postgres
              host: 'localhost', //ip
              port: 3306, //puerto
              username: 'root', //usuario
              password: 'root', //password
              database: 'ejemplo', //base de datos
              entities: [//todas las entidades
                UsuarioEntity,
                MascotaEntity,
                VacunaEntity
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
