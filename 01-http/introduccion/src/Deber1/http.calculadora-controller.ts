import {
    BadRequestException,
    Controller,
    Get,
    HttpCode,
    Param,
    Query,
    Put,
    Body,
    Headers,
    Delete,
    Post, Res, Req
} from "@nestjs/common";

// http://localhost:3001/calculadora-http
@Controller("calculadora-http")

export class HttpCalculadoraController {

    // http://localhost:3001/calculadora-http/sumar/12?n1=6
    //SUMAR (n1 + n2)
    // GET
    // 200
    // QUERY (n1)
    // RUTA (n2)
    @Get('sumar/:n2')
    @HttpCode(200)
    sumarGet(
        @Query() parametrosDeConsulta,
        @Param() parametrosDeRuta,
        @Req() req,
        @Res() res
    ){
        const validarNombreUsuario = req.cookies["usuario"]
        if (validarNombreUsuario){
            const validarN1yN2 = parametrosDeConsulta.n1 && parametrosDeRuta.n2 && !isNaN(parametrosDeConsulta.n1)  && !isNaN(parametrosDeRuta.n2)
            if(validarN1yN2){
                const resultado = Number(parametrosDeConsulta.n1) + Number(parametrosDeRuta.n2)
                const puntaje = req.signedCookies["puntaje"]
                const puntajeNuevo = (Number(puntaje) - Math.abs(resultado))
                if (Number(puntajeNuevo) <= 0){
                    res.cookie(
                        'puntaje',
                        '100',
                        {signed: true}
                    );
                    const mensaje = {
                        resultado: resultado,
                        nota: String(req.cookies["usuario"]).concat(", has terminado tus puntos, se te han restablecido de nuevo")
                    }
                    res.send(mensaje)
                } else {
                    res.cookie(
                        'puntaje',
                        puntajeNuevo,
                        {signed: true}
                    );
                    const mensaje = {
                        resultado: resultado
                    }
                    res.send(mensaje)
                }
            }else{
                throw new BadRequestException('Datos incorrectos')
            }
        }else {
            res.send("Debe registrarse")
        }

    }


    // http://localhost:3001/calculadora-http/restar?n2=6
    //RESTA (n1 - n2)
    // PUT
    // 201
    // BODY (n1)
    // QUERY (n2)
    @Put('restar')
    @HttpCode(201)
    restarPut(
        @Body() parametrosDeCuerpo,
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ){
    const validarNombreUsuario = req.cookies["usuario"]

        if (validarNombreUsuario) {
            const validarN1yN2 = parametrosDeCuerpo.n1 && parametrosDeConsulta.n2 && !isNaN(parametrosDeCuerpo.n1) && !isNaN(parametrosDeConsulta.n2)
            if (validarN1yN2) {
                const resultado = parametrosDeCuerpo.n1 - Number(parametrosDeConsulta.n2)
                const puntaje = req.signedCookies["puntaje"]
                const puntajeNuevo = (Number(puntaje) - Math.abs(resultado))
                if (Number(puntajeNuevo) <= 0){
                    res.cookie(
                        'puntaje',
                        '100',
                        {signed: true}
                    );
                    const mensaje = {
                        resultado: resultado,
                        nota: String(req.cookies["usuario"]).concat(", has terminado tus puntos, se te han restablecido de nuevo")
                    }
                    res.send(mensaje)
                } else {
                    res.cookie(
                        'puntaje',
                        puntajeNuevo,
                        {signed: true}
                    );
                    const mensaje = {
                        resultado: resultado
                    }
                    res.send(mensaje)
                }
            } else {
                //return "no valio"
                throw new BadRequestException('Datos incorrectos')
            }
        } else {
            res.send("Debe registrarse")
        }
    }

    // http://localhost:3001/calculadora-http/multiplicar
    //MULTIPLICACION (n1 * n2)
    // DELETE
    // 200
    // HEADERS (n1)
    // BODY (n2)
    @Delete('multiplicar')
    @HttpCode(200)
    multiplicarDelete(
        @Headers() headers,
        @Body() parametrosDeCuerpo,
        @Req() req,
        @Res() res
    ){
        const validarNombreUsuario = req.cookies["usuario"]

        if (validarNombreUsuario){
            const validarN1yN2 = headers["n1"] && parametrosDeCuerpo.n2 && !isNaN(headers["n1"])  && !isNaN(parametrosDeCuerpo.n2)
            if(validarN1yN2){
                const resultado = Number(headers["n1"]) * Number(parametrosDeCuerpo.n2)
                const puntaje = req.signedCookies["puntaje"]
                const puntajeNuevo = (Number(puntaje) - Math.abs(resultado))
                if (Number(puntajeNuevo) <= 0){
                    res.cookie(
                        'puntaje',
                        '100',
                        {signed: true}
                    );
                    const mensaje = {
                        resultado: resultado,
                        nota: String(req.cookies["usuario"]).concat(", has terminado tus puntos, se te han restablecido de nuevo")
                    }
                    res.send(mensaje)
                } else {
                    res.cookie(
                        'puntaje',
                        puntajeNuevo,
                        {signed: true}
                    );
                    const mensaje = {
                        resultado: resultado
                    }
                    res.send(mensaje)
                }
            }else{
                //return "no valio"
                throw new BadRequestException('Datos incorrectos')
            }
        } else {
            res.send("Debe registrarse")
        }
    }



    // http://localhost:3001/calculadora-http/dividir/12
    //DIVISION (n1 / n2)
    // POST
    // 201
    // RUTA (n1)
    // HEADERS (n2)
    @Post('dividir/:n1')
    @HttpCode(201)
    dividirDelete(
        @Param() parametrosDeRuta,
        @Headers() headers,
        @Req() req,
        @Res() res
    ){
        const validarNombreUsuario = req.cookies["usuario"]

        if (validarNombreUsuario) {
            const validarN1yN2 = parametrosDeRuta.n1 && headers["n2"] && !isNaN(parametrosDeRuta.n1) && !isNaN(headers["n2"])
            if (validarN1yN2 && (Number(headers["n2"]) != 0)) {
                const resultado = Number(parametrosDeRuta.n1) / Number(headers["n2"])
                const puntaje = req.signedCookies["puntaje"]
                const puntajeNuevo = (Number(puntaje) - Math.abs(resultado))
                if (Number(puntajeNuevo) <= 0){
                    res.cookie(
                        'puntaje',
                        '100',
                        {signed: true}
                    );
                    const mensaje = {
                        resultado: resultado,
                        nota: String(req.cookies["usuario"]).concat(", has terminado tus puntos, se te han restablecido de nuevo")
                    }
                    res.send(mensaje)
                } else {
                    res.cookie(
                        'puntaje',
                        puntajeNuevo,
                        {signed: true}
                    );
                    const mensaje = {
                        resultado: resultado
                    }
                    res.send(mensaje)
                }
            } else {
                //return "no valio"
                throw new BadRequestException('Datos incorrectos')
            }
        } else {
            res.send("Debe registrarse")
        }
    }

    // http://localhost:3001/calculadora-http/guardarNombre?nombre=Nicolas
    //METODO GUARDAR (nombre)
    // GET
    // (Guardar cookie inseguro y no firmada) nombre del usuario
    // QUERY (nombre)
    @Get("guardarNombre")
    guardarNombre(
        @Query() parametrosConsulta,
        @Res() res
    ){
        const validarNombre = parametrosConsulta.nombre

        if (validarNombre){
            res.cookie(
                "usuario", // nombre o clave
                parametrosConsulta.nombre, // valor
            );
            res.cookie(
                'puntaje',
                '100',
                {signed: true}
                );
            const mensaje = {
                mensaje:"ok"
            }

            res.send(mensaje)
        }else{
            throw new BadRequestException('Ingrese el nombre de usuario')
        }
    }


    //http://localhost:3001/calculadora-http/mostrarCookies
    @Get("mostrarCookies")
    mostrarCookies(
        @Req() req, // request - peticion
    ){
        const mensaje= {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        }
        return mensaje;
    }

}