import { Module } from '@nestjs/common';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './providers/reserva.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './reserva.entity';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { CreateReservaProvider } from './providers/create-reserva.provider';
import { UsersModule } from 'src/users/users.module';
import { UpdateReservaProvider } from './providers/update-reserva.provider';
import { GetReservasByUserIdProvider } from './providers/get-reservas-by-user.provider';
import { DeleteReservaDto } from './dtos/delete-reserva.dto';
import { DeleteReservaProvider } from './providers/delete-reserva.provider';

@Module({
  controllers: [ReservaController],
  providers: [ReservaService, CreateReservaProvider, UpdateReservaProvider, GetReservasByUserIdProvider, DeleteReservaProvider],
  imports: [TypeOrmModule.forFeature([Reserva]), ConfigModule.forFeature(jwtConfig), JwtModule.registerAsync(jwtConfig.asProvider()), UsersModule]
})
export class ReservaModule { }
