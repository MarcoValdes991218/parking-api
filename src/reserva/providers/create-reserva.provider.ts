import { InjectRepository } from "@nestjs/typeorm";
import { Reserva } from "../reserva.entity";
import { Repository } from "typeorm";
import { CreateReservaDto } from "../dtos/create-reserva.dto";
import { BadRequestException, forwardRef, Inject, RequestTimeoutException } from "@nestjs/common";
import { UsersService } from "src/users/providers/users.service";


export class CreateReservaProvider {
    constructor(
        /**
         * inject reservaRepository
         */
        @InjectRepository(Reserva)
        private readonly reservaRepository: Repository<Reserva>,

        private readonly userService: UsersService
    ) { }

    public async create(createReservaDto: CreateReservaDto) {
        const fechaFin = new Date(createReservaDto.fechaFin)
        const fechaInicio = new Date(createReservaDto.fechaInicio)
        const currentDate = new Date()

        if (fechaFin.getTime() === fechaInicio.getTime()) {
            throw new BadRequestException("Las fecha fin no puede ser igual que la fecha de inicio")
        }
        if (fechaFin.getTime() < fechaInicio.getTime()) {
            throw new BadRequestException("La fecha fin no puede ser menor que la fecah de inicio")
        }
        if (fechaInicio.getTime() < currentDate.getTime()) {
            throw new BadRequestException("La fecha de inicio no puede ser anterior a la fecha actual")
        }

        let user = await this.userService.getUserByid(createReservaDto.user_id)
        let existingreserva: Reserva | undefined = undefined;

        try {
            existingreserva = await this.reservaRepository.findOneBy({
                fechaFin: createReservaDto.fechaFin,
                fechaInicio: createReservaDto.fechaInicio,
            })
        } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
                {
                    description: 'Error connecting to the database',
                },
            );
        }
        if (existingreserva) {
            throw new BadRequestException("Ya se realizo esta reserva")
        }
        let newReserva: Reserva | undefined = undefined

        try {
            newReserva = this.reservaRepository.create({
                ...createReservaDto,
                user: user
            })

        } catch (error) {

        }

        try {
            newReserva = await this.reservaRepository.save(newReserva);
        } catch (error) {
            console.error('Error saving user:', error);
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
                {
                    description: 'Erro saving reserva' + error.message,
                },
            );
        }
        return newReserva
    }
}