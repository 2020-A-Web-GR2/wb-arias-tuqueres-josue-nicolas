import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req, Res
} from "@nestjs/common";
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";

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
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        //Promesas
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casado = parametrosDeCuerpo.casado;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;

        try{
            const errores:ValidationError[] = await validate(mascotaValida)
            if(errores.length > 0){
                console.error('Errores', errores)
                throw new BadRequestException('Error validando')
            }else{
                console.error('Errores', errores)
                return {
                    mensaje: 'Se creo correctamente'
                }
            }
        }catch (e) {
            console.error('Error', e)
            throw new BadRequestException('Error validando')
        }
        //console.log('parametros de cuerpo', parametrosDeCuerpo)
        return 'Registro creado';
    }

    // 1 Guardar Cookie Insegura
    //http://localhost:3001/juegos-http/guardarCookieInsegura
    @Get("guardarCookieInsegura")
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req,
        @Res() res
    ){
        res.cookie(
            'galletaInsegura', // nombre o clave
            'Tengo hambre', // valor
            );
        const mensaje = {
            mensaje:"ok"
        }

        res.send(mensaje)
    }

    // 2 Guardar Cookie Segura
    //http://localhost:3001/juegos-http/guardarCookieSegura
    @Get("guardarCookieSegura")
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req, // request - peticion
        @Res() res // responese - respuesta
    ){
        res.cookie(
            'galletaSegura', // nombre o clave
            'Web :3', // valor
            {
                secure: true
            }
        );
        const mensaje = {
            mensaje:"hola"
        }

        res.send(mensaje)
    }

    // 3 Mostrar Cookies
    //http://localhost:3001/juegos-http/mostrarCookies
    @Get("mostrarCookies")
    mostrarCookies(
        @Query() parametrosConsulta,
        @Req() req, // request - peticion
    ){
        const mensaje= {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        }
        return mensaje;
    }

    // 4 Guardar cookie firmada
    //http://localhost:3001/juegos-http/guardarCookieFirmada
    @Get("guardarCookieFirmada")
    guardarCookieFirmada(
        @Res() res,
    ){
        res.cookie('firmada', 'poliburguer', {signed: true});
        const mensaje = {
            mensaje : 'ok'
        }
        res.send(mensaje);
    }

}
