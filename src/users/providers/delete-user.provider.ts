import { Repository } from "typeorm";
import { Users } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetByIdProvider } from "./get-by-id.provider";
import { DeleteUserDto } from "../dtos/delete-user.dtos";
import { BadRequestException, forwardRef, Inject, RequestTimeoutException, UnauthorizedException } from "@nestjs/common";
import { equal } from "joi";
import { AuthModule } from "src/auth/auth.module";
import { HashingProvider } from "src/auth/providers/hashing.provider";

export class DeleteUserProvider {

    constructor(
        /**
         * Injec usersRepository
         */
        @InjectRepository(Users)
        private readonly usersRepositry: Repository<Users>,
        /**
         * Inject getByIdProvider
         */
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
    ) { }

    public async delete(deleteUserDto: DeleteUserDto) {

        let existingUser: Users | undefined = undefined;

        try {
            existingUser = await this.usersRepositry.findOneBy({
                email: deleteUserDto.email
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
            throw new BadRequestException("User not exist")
        }

        let isEqual: boolean = false
        try {
            if (this.hashingProvider.comparePassword(existingUser.password, deleteUserDto.password)) {
                isEqual = true
            }
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: "Could not compare passwords"
            }
            )
        }
        if (isEqual) {
            await this.usersRepositry.delete(existingUser.id)
        } else {
            throw new UnauthorizedException("Incorrect Password")
        }

        return (true)
    }


}
