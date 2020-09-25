import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {UsuarioUpdateDto} from "./dto/usuario.update-dto";
import {MascotaService} from "../mascota/mascota.service";
import {UsuarioEntity} from "./usuario.entity";
@Controller("usuario")

//http://localhost:3001/usuario

//http://localhost:3001/usuario/hola
export class usuarioController {

    public arregloUsuario = [
        {
            id: 1,
            nombre: "Nicolas"
        },
        {
            id: 2,
            nombre: "Josue"
        },
        {
            id: 3,
            nombre: "Freddy"
        }
    ]
    public idActual = 3;

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService
    ) {
    }

    @Get()
    @HttpCode(201)
    async mostrarTodos(){
        try {
            const respuesta = await this._usuarioService.buscarTodos()
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {mensaje:"Error del servidor"}
            )
        }
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        const usuarioValido = new UsuarioCreateDto();
        usuarioValido.nombre = parametrosCuerpo.nombre;
        usuarioValido.apellido = parametrosCuerpo.apellido;
        usuarioValido.cedula = parametrosCuerpo.cedula;
        usuarioValido.sueldo = parametrosCuerpo.sueldo;
        usuarioValido.fechaNacimiento = parametrosCuerpo.fechaNacimiento;

        try {
            //validacion del create DTO
            const errores:ValidationError[] = await validate(usuarioValido)
            if(errores.length > 0){
                console.error('Errores', errores)
                throw new BadRequestException('Error validando datos')
            }else{
                const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
                return {
                    mensaje: 'Se creo correctamente',
                    respuesta: respuesta
                }
            }
        } catch (e) {
            console.error(e);
            throw new BadRequestException(
                {mensaje:"Error validando datos"}
            )
        }
        /*const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        }
        this.arregloUsuario.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario*/
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        let respuesta;
        try {
            respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id))
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException(
                {mensaje:"Error del servidor"}
            )
        }

        if(respuesta){
            return respuesta
        }else {
            throw new NotFoundException(
                {mensaje:"No existen registros"}
            )
        }
        /*const indice = this.arregloUsuario.findIndex(
            //(usuario) => usuario.id === Number(parametros.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuario[indice]*/
    }

    @Put(':id')
    async editarUno(
        @Body() parametrosCuerpo,
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;

        const usuarioValido = new UsuarioUpdateDto();
        usuarioValido.nombre = parametrosCuerpo.nombre;
        usuarioValido.apellido = parametrosCuerpo.apellido;
        usuarioValido.cedula = parametrosCuerpo.cedula;
        usuarioValido.sueldo = parametrosCuerpo.sueldo;
        usuarioValido.fechaNacimiento = parametrosCuerpo.fechaNacimiento;


        try {
            const errores:ValidationError[] = await validate(usuarioValido)
            if(errores.length > 0){
                console.error('Errores', errores)
                throw new BadRequestException('Error validando datos')
            }else{
                const respuesta = await this._usuarioService.editarUno(usuarioEditado);
                return {
                    mensaje: 'Se actualizó correctamente',
                    respuesta: respuesta
                }
            }

        } catch (e) {
            console.error(e);
            throw new BadRequestException(
                {mensaje:"Error validando datos"}
            )
        }

        /*const indice = this.arregloUsuario.findIndex(
            //(usuario) => usuario.id === Number(parametros.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuario[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuario[indice]*/
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        try {
            //validacion del create DTO
            const respuesta = await this._usuarioService.eliminarUno(id);
            return {
                mensaje:"Registro con id " + id + " eliminado"
            }
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException(
                {mensaje:"Error del servidor"}
            )
        }

        /*const indice = this.arregloUsuario.findIndex(
            //(usuario) => usuario.id === Number(parametros.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuario.splice(indice, 1)
        return this.arregloUsuario[indice]*/
    }

    @Post("crearUsuarioYcrearMascota")
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;
        //VALIDAR USUARIO
        //VALIDAR MASCOTA
        // -> CREAMOS LOS DOS
        let usuarioCreado
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje: "Error creado usuario"})
        }
        if(usuarioCreado){
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota)
            }catch (e) {
                console.error(e);
                throw new InternalServerErrorException({mensaje: "Error creado mascota"})
            }
            if(mascotaCreada){
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            }else{
                throw new InternalServerErrorException({mensaje: "Error creado mascota"})
            }
        }else{
            throw new InternalServerErrorException({mensaje: "Error creado usuario"})
        }

    }

    //http://localhost:3001/usuario/vista/usuario
    @Get("vista/usuario")
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = "Nicolas";
        res.render(
            "usuario/ejemplo", // NOMBRE DE LA VISTA
            { // PARAMETROS DE LA VISTA
                nombre: nombreControlador
            }
        )
    }

    //http://localhost:3001/usuario/vista/faq
    @Get("vista/faq")
    faq(
        @Res() res
    ){
        res.render("usuario/faq")
    }

    //http://localhost:3001/usuario/vista/login
    @Get("vista/login")
    login(
        @Res() res
    ){
        res.render("usuario/login")
    }

    //http://localhost:3001/usuario/vista/inicio
    @Get("vista/inicio")
    async inicio(
        @Res() res,
        @Query() parametrosConsulta
    ){
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }
        if (resultadoEncontrado) {
            res.render(
                'usuario/inicio',
                {
                    arregloUsuarios: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                });
        } else {
            throw new NotFoundException('No se encontraron usuarios')
        }
    }

    //http://localhost:3001/usuario/vista/crear
    @Get("vista/crear")
    crearUsuarioVista(
        @Res() res,
        @Query() parametrosConsulta,
    ){
        res.render(
                "usuario/crear",
                {
                    error: parametrosConsulta.error,
                    nombre: parametrosConsulta.nombre,
                    apellido: parametrosConsulta.apellido,
                    cedula: parametrosConsulta.cedula
                }
            )
    }

    //http://localhost:3001/usuario/vista/editar/1
    @Get("vista/editar/:id")
    async editarUsuarioVista(
        @Res() res,
        @Param() parametrosRuta,
        @Query() parametrosConsulta
    ){
        const id = Number(parametrosRuta.id)
        let usuarioEncontrado;
        try{
            usuarioEncontrado = await this._usuarioService.buscarUno(id)
        }catch{
            console.error('Error del servidor')
            return res.redirect('/usuario/vista/inicio?mensaje= Error buscado usuario')
        }
        if (usuarioEncontrado){
            return res.render(
                "usuario/crear",
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado
                }
            )
        } else {
            return res.redirect('/usuario/vista/inicio?mensaje= Usuario no encontrado')
        }
    }


    @Post("crearDesdeVista")
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ){
        let nombreApellidoConsulta
        let cedulaConsulta
        if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
            nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
            if (parametrosCuerpo.cedula.length === 10) {
                cedulaConsulta =`&cedula=${parametrosCuerpo.cedula}`
            } else {
                const mensajeError = 'Cedula incorrecta'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)
            }
        } else {
            const mensajeError = 'Enviar cedula(10) nombre y apellido'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError)
        }
        let respuestaCreacionUsuario;
        try {
            respuestaCreacionUsuario = await this._usuarioService.crearUno(parametrosCuerpo);
        } catch (error) {
            console.error(error);
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }
        if (respuestaCreacionUsuario) {
            return res.redirect('/usuario/vista/inicio');
        } else {
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta);
        }

    }

    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ){
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            //cedula: parametrosCuerpo.cedula,
        } as UsuarioEntity
        try {
            await this._usuarioService.editarUno(usuarioEditado)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado')
        }catch (e) {
            console.error(e)
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario')
        }

    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado')
        } catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario')
        }
    }

    //XML <usuario><nombre>Nicolas</nombre><apellido>Arias</apellido></usuario>
    //JSON {"nombre":"Nicolas","apellido":"Arias"}
    //RESTful - JSON
    // http://localhost:3001/
    // RESTFUL MASCOTA
    // Ver todos
    // GET http://localhost:3001/mascota
    // Ver Uno
    // GET http://localhost:3001/mascota/1
    // Crear Uno
    // POST http://localhost:3001/mascota (BODY) {"nombre":"chicho"}
    // Editar Uno
    // PUT http://localhost:3001/mascota/1 (BODY) {"nombre":"akbar"}
    // Eliminar Uno
    // DELETE http://localhost:3001/mascota/1

}