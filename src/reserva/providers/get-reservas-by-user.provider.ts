import { In, Repository } from "typeorm";
import { Reserva } from "../reserva.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, RequestTimeoutException } from "@nestjs/common";

export class GetReservasByUserIdProvider {
    constructor(
        /*
        *Inject reservasRepository
         */
        @InjectRepository(Reserva)
        private readonly reservaRepository: Repository<Reserva>,
    ) { }
    public async getReservasByUserId(userId: number) {
        let reservas: Reserva[]

        try {
            reservas = await this.reservaRepository.find({ where: { user: { id: userId } } })

        } catch (error) {
            throw new RequestTimeoutException("No se puede conectar con la Bd")
        }

        if (!reservas) {
            throw new BadRequestException("Este Usuario no tiene reservas")
        }
        return reservas
    }

    public async findAll() {
        let reservas: Reserva[]
        return reservas = await this.reservaRepository.find()
    }
}