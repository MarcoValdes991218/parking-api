import { BadRequestException, Inject, RequestTimeoutException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../user.entity";
import { Repository } from "typeorm";

export class GetByIdProvider {
    constructor(
        /**
         * Inject
         */
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) { }

    public async getbyId(id: number) {
        let existingUser: Users | undefined = undefined

        try {
            existingUser = await this.usersRepository.findOneBy({
                id: id
            })
        } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
                {
                    description: 'Error connecting to the database',
                },
            );
        }
        if (!existingUser) {
            throw new BadRequestException("El usuario no existe ")
        }
        console.log(existingUser)

        return existingUser
    }


}