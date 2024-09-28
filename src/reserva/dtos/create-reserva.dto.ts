import { IsDateString, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CreateReservaDto {

    @IsNotEmpty()
    @IsDateString()
    fechaInicio: string; // Fecha de inicio

    @IsNotEmpty()
    @IsDateString()
    fechaFin: string; // Fecha de fin

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(96)
    marca: string; // Marca del coche

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(96)
    modelo: string; // Modelo del coche

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(96)
    placa: string; // Placa del coche

    @IsNotEmpty()
    @IsInt()
    user_id: number

}