import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dtos';
import { CreateUserProvider } from './create-user.provider';
import { UpdateUserDto } from '../dtos/update-users.dtos';
import { UpdateUserProvider } from './update-user.provider';
import { DeleteUserDto } from '../dtos/delete-user.dtos';
import { DeleteUserProvider } from './delete-user.provider';
import { UpdateClienteDto } from '../dtos/update-cliente-dtos';
import { UpdatePasswordProvider } from './update-password.provider';

@Injectable()
export class UsersService {
    constructor(
        /**
         * Inject userRepository
         */
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,

        /**
         * Inject createUserProvider
         */
        private readonly createUserProvider: CreateUserProvider,

        /**
         * Inject updateUserProvider
         */
        private readonly updateUserProvider: UpdateUserProvider,

        /**
         * Inject deleteUserProvider
         */
        private readonly deleteUserProvider: DeleteUserProvider,
        /**
         * Inject updatePasswordProvide
         */
        private readonly updatePasswordProvider: UpdatePasswordProvider,
    ) { }

    public async create(createUserDto: CreateUserDto) {
        return await this.createUserProvider.createUser(createUserDto)
    }

    public async update(updateUserDto: UpdateUserDto) {
        return await this.updateUserProvider.update(updateUserDto)
    }

    public async updatePassword(updateClienteDto: UpdateClienteDto, userId: number) {
        return await this.updatePasswordProvider.updatePassword(updateClienteDto, userId)
    }

    public async get() {
        try {
            return await this.userRepository.find()
        } catch (error) {
            throw new BadRequestException("Unable to process your request at the moment please try later")
        }
    }
    public async delete(deleteUserDto: DeleteUserDto) {
        return await this.deleteUserProvider.delete(deleteUserDto)
    }
    public async getUserByEmail(email: string) {
        let existingUser: Users | undefined = undefined;

        try {
            existingUser = await this.userRepository.findOneBy({
                email: email
            })
        } catch (error) {
            throw new BadRequestException("Unable to process your request at the moment please try later")
        }
        if (!existingUser) {
            throw new BadRequestException("User not exist")
        }

        return existingUser
    }

    public async getUserByid(id: number) {
        let existingUser: Users | undefined = undefined
        try {
            existingUser = await this.userRepository.findOneBy({
                id: id
            })
        } catch (error) {
            throw new BadRequestException("Unable to process your request at the moment please try later")
        }
        if (!existingUser) {
            throw new BadRequestException("User not exist")
        }

        return existingUser
    }
}



