import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { GetByIdProvider } from './providers/get-by-id.provider';
import { UpdateUserProvider } from './providers/update-user.provider';

import { DeleteUserProvider } from './providers/delete-user.provider';
import { AuthModule } from 'src/auth/auth.module';
import jwtConfig from 'src/auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UpdatePasswordProvider } from './providers/update-password.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CreateUserProvider, GetByIdProvider, UpdateUserProvider, DeleteUserProvider, UpdatePasswordProvider],
  imports: [TypeOrmModule.forFeature([Users]), forwardRef(() => AuthModule), ConfigModule.forFeature(jwtConfig), JwtModule.registerAsync(jwtConfig.asProvider())],
  exports: [UsersService]
})
export class UsersModule { }
