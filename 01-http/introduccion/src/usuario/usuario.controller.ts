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
    Put
} from "@nestjs/common";
import {usuarioService} from "./usuario.service";
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
        private readonly _usuarioService: usuarioService
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
        try {
            //validacion del create DTO
            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            return respuesta
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
        try {
            //validacion del create DTO
            const respuesta = await this._usuarioService.editarUno(usuarioEditado);
            return respuesta
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