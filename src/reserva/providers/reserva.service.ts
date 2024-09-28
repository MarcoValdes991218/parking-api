import { Injectable } from '@nestjs/common';
import { CreateReservaDto } from '../dtos/create-reserva.dto';
import { CreateReservaProvider } from './create-reserva.provider';
import { UpdateReservaDto } from '../dtos/update-reserva.dto';
import { UpdateReservaProvider } from './update-reserva.provider';
import { GetReservasByUserIdProvider } from './get-reservas-by-user.provider';
import { DeleteReservaDto } from '../dtos/delete-reserva.dto';
import { DeleteReservaProvider } from './delete-reserva.provider';
import { string } from 'joi';


@Injectable()
export class ReservaService {
    constructor(
        /**
         * inject createReservaProvider
         */
        private readonly createReservaProvider: CreateReservaProvider,
        /**
         * inject updateReservaProvider
         */
        private readonly updateReservaProvider: UpdateReservaProvider,
        /**
         * injetc getReservasByUserIdProvider
         */
        private readonly getReservasByUserIdProvider: GetReservasByUserIdProvider,
        /**
         * inject deleteReservaProvider
         */
        private readonly deleteReservaProvider: DeleteReservaProvider
    ) { }

    public async create(createReservaDto: CreateReservaDto) {
        return await this.createReservaProvider.create(createReservaDto)
    }

    public async update(updateReservaDto: UpdateReservaDto, userId: number, rol: string) {
        return await this.updateReservaProvider.update(updateReservaDto, userId, rol)
    }

    public async getReservasByUserId(id: number) {
        return await this.getReservasByUserIdProvider.getReservasByUserId(id)
    }
    public async getAll() {
        return await this.getReservasByUserIdProvider.findAll()
    }
    public async delete(idReserva, userId: number, rol: string) {
        return await this.deleteReservaProvider.delete(idReserva, userId, rol)
    }
}
