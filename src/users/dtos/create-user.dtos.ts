import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Rol } from "src/auth/enums/rol.enum";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(96)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(96)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
            'Minimum eight characters, at least one letter, one number and one special character',
    })
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(96)
    email: string;

    @IsEnum(Rol)
    @IsNotEmpty()
    rol: Rol;
}