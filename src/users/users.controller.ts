import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './providers/users.service';
import { UpdateUserDto } from './dtos/update-users.dtos';
import { DeleteUserDto } from './dtos/delete-user.dtos';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Rol } from 'src/auth/enums/rol.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-toke.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateClienteDto } from './dtos/update-cliente-dtos';
@Controller('users')
export class UsersController {
    constructor(
        /**
         * Inject userService
         */
        private readonly userService: UsersService
    ) { }

    @Post()
    public create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Patch()
    @Roles(Rol.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    public update(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(updateUserDto)
    }

    @Patch("update-password")
    @Roles(Rol.CLIENTE)
    @UseGuards(AccessTokenGuard, RolesGuard)
    public updatePassword(@Request() req, @Body() updateClienteDto: UpdateClienteDto) {
        const id: number = req.user.id

        return this.userService.updatePassword(updateClienteDto, id)
    }



    @Get()
    public get() {
        return this.userService.get();
    }

    @Delete()
    @Roles(Rol.CLIENTE)
    @UseGuards(AccessTokenGuard, RolesGuard)
    public delete(@Body() deleteUserDto: DeleteUserDto) {
        return this.userService.delete(deleteUserDto)
    }
}
