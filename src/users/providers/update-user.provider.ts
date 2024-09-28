import { Repository } from "typeorm";
import { Users } from "../user.entity";
import { UpdateUserDto } from "../dtos/update-users.dtos";
import { BadRequestException, forwardRef, Inject, RequestTimeoutException } from "@nestjs/common";
import { GetByIdProvider } from "./get-by-id.provider";
import { InjectRepository } from "@nestjs/typeorm";
import { HashingProvider } from "src/auth/providers/hashing.provider";


export class UpdateUserProvider {
    constructor(
        /**
         * Inject usersRepository
         */
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        /**
         * inject getByIdProvider
         */
        private readonly getByIdProvider: GetByIdProvider,
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
    ) { }

    public async update(updateUserDto: UpdateUserDto) {
        let existingUser: Users | undefined = undefined

        try {
            existingUser = await this.getByIdProvider.getbyId(updateUserDto.id)
        } catch (error) {
            throw new BadRequestException("Unable to process your request at the moment please try later")
        }

        //update 
        existingUser.nombre = updateUserDto.nombre ?? existingUser.nombre;
        existingUser.password = await this.hashingProvider.hashPassword(updateUserDto.password) ?? existingUser.password;
        existingUser.email = updateUserDto.email ?? existingUser.email;
        existingUser.rol = updateUserDto.rol ?? existingUser.rol;

        try {
            await this.usersRepository.save(existingUser)
        } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
                {
                    description: 'Error al actualizar',
                },
            );
        }
        return existingUser

    }
}