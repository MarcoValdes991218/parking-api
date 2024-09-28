import { PartialType } from "@nestjs/swagger";
import { CreateReservaDto } from "./create-reserva.dto";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
    @IsNotEmpty()
    @IsInt()
    id: number
}