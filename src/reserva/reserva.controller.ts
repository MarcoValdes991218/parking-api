import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ReservaService } from './providers/reserva.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Rol } from 'src/auth/enums/rol.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-toke.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateReservaDto } from './dtos/create-reserva.dto';
import { UpdateReservaDto } from './dtos/update-reserva.dto'
import { DeleteReservaDto } from './dtos/delete-reserva.dto';

@Controller('reserva')
export class ReservaController {
    constructor(
        /**
         *  Inject reservaService
         */
        private readonly reservaService: ReservaService
    ) { }

    /**
     * Falta verificar que cuando se la reserva no tenga conflicto con otra y verificar los sitios donde se pueda crear
     */
    @Post()
    @Roles(Rol.CLIENTE, Rol.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    public create(@Body() createReservaDto: CreateReservaDto) {
        return this.reservaService.create(createReservaDto)
    }

    /**
     * Falta verificar que cuando se actualice la reserva no tenga conflicto con otra q este en el mismo sitio
     */
    @Patch()
    @Roles(Rol.CLIENTE, Rol.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    public update(@Body() updateReservaDto: UpdateReservaDto, @Request() req) {
        const userId = req.user.id
        const rol = req.user.rol
        return this.reservaService.update(updateReservaDto, userId, rol)
    }

    @Get()
    @Roles(Rol.CLIENTE)
    @UseGuards(AccessTokenGuard, RolesGuard)
    public getReservasByUserId(@Request() req) {
        const id = req.user.id
        return this.reservaService.getReservasByUserId(id)
    }

    @Get("all")
    @Roles(Rol.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    public getAllReserva() {
        return this.reservaService.getAll();
    }

    /**
     * Todo Listo Aqui
     */
    @Delete(":idReserva")
    @Roles(Rol.ADMIN, Rol.CLIENTE)
    @UseGuards(AccessTokenGuard, RolesGuard)
    public delete(@Param("idReserva") idRserva: number, @Request() req) {
        const rol = req.user.rol
        const idUser = req.user.id
        return this.reservaService.delete(idRserva, idUser, rol)
    }
}
