import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteReservaDto {
    @IsNotEmpty()
    @IsInt()
    id: number
}