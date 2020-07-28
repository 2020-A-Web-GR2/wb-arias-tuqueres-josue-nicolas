/*import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from "@nestjs/common";
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

    @Get()
    @HttpCode(201)
    mostrarTodos(){
        return "ok"
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        }
        this.arregloUsuario.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario
    }

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuario.findIndex(
            //(usuario) => usuario.id === Number(parametros.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuario[indice]
    }

    @Put(':id')
    editarUno(
        @Body() parametrosCuerpo,
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuario.findIndex(
            //(usuario) => usuario.id === Number(parametros.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuario[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuario[indice]
    }

    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuario.findIndex(
            //(usuario) => usuario.id === Number(parametros.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuario.splice(indice, 1)
        return this.arregloUsuario[indice]
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

*/
