import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService {

    constructor( // Inyeccion de Dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {
    }
    crearUno(nuevoUsuario:UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) //promesa
    }

    buscarTodos(){
        return this.repositorio.find() //promesa
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id) //promesa
    }

    editarUno(usuarioEditado: UsuarioEntity){
        return this.repositorio.save(usuarioEditado) //promesa
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id) //promesa
    }

}

