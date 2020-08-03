import {Module} from "@nestjs/common";
import {usuarioController} from "./usuario.controller";
import {usuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";


@Module({
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    UsuarioEntity
                ],
                'default' //nombre de la cadena de conexión
            )
    ],
    controllers: [
        usuarioController
    ],
    providers: [
        usuarioService
    ],
})

export class usuarioModule{}
