import {BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Query} from "@nestjs/common";

// http://localhost:3001/juegos-http
//@Controller('juegos-http')

@Controller('juegos-http') //URL

export class HttpJuegoController {

    @Get('hola')
    @HttpCode(201)
    holaGet(){
        throw new BadRequestException('No envía nada')
        //return 'Hola GET :)'
    }

    @Post('hola')
    @HttpCode(202)
    holaPost(){
        return 'Hola POST :)'
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelte(){
        return 'Hola DELETE :)'
    }

    //http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    @Get('/parametros-ruta/:edad/gestion/:altura')
    paremetroRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros', parametrosRuta);
        if (!isNaN(parametrosRuta.edad)  && !isNaN(parametrosRuta.altura)){
            const edad = Number(parametrosRuta.edad);
            const altura = Number(parametrosRuta.altura);
            return edad + altura;
        } else{
            throw new BadRequestException('No son números')
        }
    }

    //http://localhost:3001/juegos-http/parametros-consulta
    @Get('/parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){
        console.log('parametrosDeConsulta', parametrosDeConsulta)
        console.log('nombre', typeof parametrosDeConsulta.nombre)
        console.log('apellido', typeof parametrosDeConsulta.apellido)
        const tieneApellidoYNombre = parametrosDeConsulta.nombre && parametrosDeConsulta.apellido

        /*if((typeof parametrosDeConsulta.nombre !== 'undefined')
            && (typeof parametrosDeConsulta.apellido !== 'undefined')
            && (parametrosDeConsulta.length == 2)){*/
        if(tieneApellidoYNombre){
           return parametrosDeConsulta.nombre + " " + parametrosDeConsulta.apellido;
        }else{
            return '=D';
        }

    }

    //http://localhost:3001/juegos-http/parametros-cuerpo
    @Post('parametros-cuerpo')
    parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        console.log('parametros de cuerpo', parametrosDeCuerpo)
        return 'Registro creado';
    }

}