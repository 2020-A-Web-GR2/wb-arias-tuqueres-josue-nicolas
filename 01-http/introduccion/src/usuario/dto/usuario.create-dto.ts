import {IsDate, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";

export class UsuarioCreateDto{
    @IsString()
    @Length(3,60)
    @IsOptional()
    nombre?: string

    @IsString()
    @Length(3,60)
    @IsOptional()
    apellido?: string

    @IsString()
    @IsNotEmpty()
    @Length(10,18)
    cedula: string

    @IsNumber()
    @IsOptional()
    sueldo?:number;

    @IsDate()
    @IsOptional()
    fechaNacimiento?:string;

}