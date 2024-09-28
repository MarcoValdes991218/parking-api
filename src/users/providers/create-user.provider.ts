import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../user.entity";
import { HashingProvider } from "src/auth/providers/hashing.provider";




@Injectable()
export class CreateUserProvider {

    constructor(
        /**
         * inject UserRepository
         */
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        /**
         * Inject hasshingProvider
         */
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,


    ) { }

    public async createUser(createUserDto: CreateUserDto) {
        let existingUser = undefined;
        try {
            // Check is user exists with same email
            existingUser = await this.usersRepository.findOneBy({
                email: createUserDto.email
            })
        } catch (error) {
            // Might save the details of the exception
            // Information which is sensitive
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
                {
                    description: 'Error connecting to the database',
                },
            );
        }
        // Handle exception
        if (existingUser) {
            throw new BadRequestException(
                'The user already exists, please check your email.',
            );

        }

        // Create a new user
        let newUser = this.usersRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password)
        })




        try {
            newUser = await this.usersRepository.save(newUser);
        } catch (error) {
            console.error('Error saving user:', error);
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later',
                {
                    description: 'Erro saving user' + error.message,
                },
            );
        }



        return newUser;
    }
}