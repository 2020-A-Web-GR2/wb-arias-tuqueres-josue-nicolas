import {
    IsAlpha,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsBoolean,
    IsInt,
    IsPositive,
    IsOptional,
    IsNumber,
    IsString,
    Length
} from "class-validator";

export class MascotaCreateDto{

    @IsString()
    @IsAlpha()
    //@MinLength(3)
    //@MaxLength(60)
    @Length(3,60)
    @IsNotEmpty()
    nombre:string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    edad:number; //enteros

    @IsBoolean()
    @IsOptional()
    casado?:boolean; //Opcional --> ?

    @IsBoolean()
    @IsNotEmpty()
    ligada:boolean;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    peso:number; //decimales


}