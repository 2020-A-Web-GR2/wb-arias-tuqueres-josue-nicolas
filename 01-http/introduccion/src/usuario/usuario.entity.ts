import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


@Index([ //INDICES DE BUSQUEDA ---- NOMBRES DE LAS PROPIEDADES DE LA CLASE
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento'
])
@Index(['nombre','apellido','cedula'], // INDICES COMPUESTOS
    {unique:true})
@Entity('db_usuario') //nombre de la tabla de base de datos}
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'nombre',
        type: "varchar",
        nullable: true,
        length: '60',
    })
    nombre?: string

    @Column({
        name: 'apellido',
        type: "varchar",
        nullable: true,
        length: '60',
    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: "varchar",
        nullable: false,
        unique: true,
        length: '18',
    })
    cedula: string

    @Column({
        name: 'sueldo',
        nullable: true,
        type: "decimal",
        precision: 10, // 1000000000.
        scale: 4, //.0001
    })
    sueldo?:number;

    @Column({
        name:'fecha_nacimiento',
        nullable: true,
        type: "datetime",
    })
    fechaNacimiento?:string;
}