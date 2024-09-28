import { IsNotEmpty, IsString } from "class-validator";

export class GetByEmailDtos {

    @IsString()
    @IsNotEmpty()
    email: string
}