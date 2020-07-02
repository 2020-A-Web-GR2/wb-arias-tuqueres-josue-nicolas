import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      //Aqui otros módulos
  ],
  controllers: [
      //Controladores de APP MODULE
      AppController],
  providers: [
      //Servicios de APP MODULE
      AppService],
})
export class AppModule {}
