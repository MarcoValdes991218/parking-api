import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../user.entity";
import { Repository } from "typeorm";
import { UpdateClienteDto } from "../dtos/update-cliente-dtos";
import { BadRequestException, forwardRef, Inject, RequestTimeoutException } from "@nestjs/common";
import { HashingProvider } from "src/auth/providers/hashing.provider";
import { use } from "passport";

export class UpdatePasswordProvider {
    constructor(
        /**
      * Inject UserRepository
      */
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        /**
         * inject Hashinprovider
         */
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
    ) { }

    public async updatePassword(updateClienteDto: UpdateClienteDto, userId: number) {
        if (updateClienteDto.newpassword === updateClienteDto.password) {
            throw new BadRequestException("El nuevo password no puede ser igual al anterior")
        }

        let user: Users | undefined = undefined

        try {
            user = await this.usersRepository.findOneBy({
                id: userId,
                email: updateClienteDto.email
            })
        } catch (error) {
            throw new RequestTimeoutException("No se puede coenctar con la base de datos")
        }
        if (!user) {
            throw new BadRequestException("User not found")
        }


        if (! await this.hashingProvider.comparePassword(updateClienteDto.password, user.password)) {
            throw new BadRequestException("Password Incorrecto")
        }

        //upadate
        user.password = await this.hashingProvider.hashPassword(updateClienteDto.newpassword)

        try {
            await this.usersRepository.save(user)
        } catch (error) {
            throw new BadRequestException("asdasd")
        }

        return user


    }


}