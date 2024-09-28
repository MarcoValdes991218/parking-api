import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class DeleteUserDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(96)
    email: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(96)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
            'Minimum eight characters, at least one letter, one number and one special character',
    })
    password: string

}