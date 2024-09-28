import { Repository } from "typeorm";
import { Reserva } from "../reserva.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateReservaDto } from "../dtos/update-reserva.dto";
import { BadRequestException, NotFoundException, RequestTimeoutException } from "@nestjs/common";
import { GetReservasByUserIdProvider } from "./get-reservas-by-user.provider";


export class UpdateReservaProvider {
    constructor(
        /**
         * inject reservaRepository
         */
        @InjectRepository(Reserva)
        private readonly reservaRepository: Repository<Reserva>,
        /**
         * inject getReservaByIdProvider
         */
        private readonly getReservaByUserIdProvider: GetReservasByUserIdProvider,
        /**
         * inject getReservasByUserProvider
         */

    ) { }

    public async update(updateReservaDto: UpdateReservaDto, userId: number, rol: string) {
        let reserva: Reserva | undefined = undefined;

        let reservas: Reserva[] | undefined = undefined;

        const fechaFin = new Date(updateReservaDto.fechaFin)
        const fechaInicio = new Date(updateReservaDto.fechaInicio)
        const currentDate = new Date()

        if (rol === "Cliente") {

            try {
                reservas = await this.getReservaByUserIdProvider.getReservasByUserId(userId)
            } catch (error) {
                throw new RequestTimeoutException("No se puede procesar la solicitud")
            }

            if (reservas.length === 0) {
                throw new RequestTimeoutException("Usted no tiene reservas")
            }

            try {
                reserva = reservas.find(reserva => reserva.id === updateReservaDto.id
                )
            } catch (error) {
                throw new BadRequestException("Unable to process your request at the moment please try later")
            }

            if (!reserva) throw new NotFoundException("La reserva buscada " + updateReservaDto.id + " no existe ")


            if (fechaFin.getTime() === fechaInicio.getTime()) {
                throw new BadRequestException("Las fecha fin no puede ser igual que la fecha de inicio")
            }
            if (fechaFin.getTime() < fechaInicio.getTime()) {
                throw new BadRequestException("La fecha fin no puede ser menor que la fecah de inicio")
            }

            if (fechaInicio.getTime() < currentDate.getTime()) {
                throw new BadRequestException("La fecha de inicio no puede ser anterior a la fecha actual")
            }
            reserva.fechaFin = updateReservaDto.fechaFin ?? reserva.fechaFin
            reserva.fechaInicio = updateReservaDto.fechaInicio ?? reserva.fechaInicio
            reserva.marca = updateReservaDto.marca ?? reserva.marca
            reserva.modelo = updateReservaDto.modelo ?? reserva.modelo
            reserva.placa = updateReservaDto.placa ?? reserva.placa


            try {
                await this.reservaRepository.save(reserva)
            } catch (error) {
                throw new RequestTimeoutException(
                    'Unable to process your request at the moment please try later',
                    {
                        description: 'Error connecting to the database',
                    },
                );
            }
        }

        if (rol === "Admin") {

            try {
                reserva = await this.reservaRepository.findOneBy({
                    id: updateReservaDto.id
                })
            } catch (error) {
                throw new RequestTimeoutException(
                    'Unable to process your request at the moment please try later',
                    {
                        description: 'Error connecting to the database',
                    },
                );
            }
            if (!reserva) {
                throw new BadRequestException("No existe esta reserva")
            }

            if (fechaFin.getTime() === fechaInicio.getTime()) {
                throw new BadRequestException("Las fecha fin no puede ser igual que la fecha de inicio")
            }
            if (fechaFin.getTime() < fechaInicio.getTime()) {
                throw new BadRequestException("La fecha fin no puede ser menor que la fecah de inicio")
            }

            if (fechaInicio.getTime() < currentDate.getTime()) {
                throw new BadRequestException("La fecha de inicio no puede ser anterior a la fecha actual")
            }
            reserva.fechaFin = updateReservaDto.fechaFin ?? reserva.fechaFin
            reserva.fechaInicio = updateReservaDto.fechaInicio ?? reserva.fechaInicio
            reserva.marca = updateReservaDto.marca ?? reserva.marca
            reserva.modelo = updateReservaDto.modelo ?? reserva.modelo
            reserva.placa = updateReservaDto.placa ?? reserva.placa


            try {
                await this.reservaRepository.save(reserva)
            } catch (error) {

                throw new RequestTimeoutException(
                    'Unable to process your request at the moment please try later',
                    {
                        description: 'Error connecting to the database',
                    },
                );
            }

        }

        return reserva
    }
}