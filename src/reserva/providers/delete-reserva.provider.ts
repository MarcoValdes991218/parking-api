import { Admin, Repository } from "typeorm";
import { Reserva } from "../reserva.entity";
import { GetReservasByUserIdProvider } from "./get-reservas-by-user.provider";
import { BadRequestException, Inject, NotFoundException, RequestTimeoutException } from "@nestjs/common";
import { DeleteReservaDto } from "../dtos/delete-reserva.dto";
import { InjectRepository } from "@nestjs/typeorm";

export class DeleteReservaProvider {
    constructor(
        /*
        *Inject reservasRepository
         */
        @InjectRepository(Reserva)
        private readonly reservasRepository: Repository<Reserva>,
        /**
         * inject getReservaByUserIdProvider
         */
        private readonly getReservaByUserIdProvider: GetReservasByUserIdProvider
    ) { }

    public async delete(idReserva, userId: number, rol: string) {


        let reserva: Reserva | undefined = undefined;

        let reservas: Reserva[] | undefined = undefined;
        if (rol === "Cliente") {
            try {
                reservas = await this.getReservaByUserIdProvider.getReservasByUserId(userId)
            } catch (error) {
                throw new RequestTimeoutException("No se puede conectar a la base de datos")
            }
            if (reservas.length === 0) {
                throw new RequestTimeoutException("Usted no tiene reservas")
            }


            try {
                reserva = reservas.find(reserva => reserva.id === idReserva
                )
            } catch (error) {
                throw new BadRequestException("No se puede conectar a la Base de datos")
            }

            if (!reserva) throw new NotFoundException("El usuario no tiene esta reserva")

            try {
                await this.reservasRepository.delete(reserva.id)
            } catch (error) {
                throw new RequestTimeoutException("No se puede conectar a la base de datos")
            }
        }

        if (rol === "Admin") {

            let adminReserva: Reserva | undefined = undefined

            try {
                adminReserva = await this.reservasRepository.findOneBy({
                    id: idReserva
                })
            } catch (error) {
                throw new RequestTimeoutException("No se puede conectar a la base de datos")
            }

            if (!adminReserva) {
                throw new BadRequestException("La reserva no existe")
            }

            try {
                await this.reservasRepository.delete(idReserva)
            } catch (error) {
                throw new RequestTimeoutException("No se puede conectar a la base de datos")
            }
        }
        return true
    }
}