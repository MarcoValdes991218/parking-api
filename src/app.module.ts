import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParkingSpotModule } from './parking-spot/parking-spot.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfing from './config/app.confing';
import enviromentsValidations from './config/enviroments.validations';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaModule } from './reserva/reserva.module';

import databaseConfig from './config/database.config';


const ENV = process.env.NODE_ENV;

@Module({
  imports: [ParkingSpotModule, UsersModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfing, databaseConfig],
      validationSchema: enviromentsValidations,
    },),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: configService.get('database.synchronize'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        database: configService.get('database.name'),
      }),
    }),
    ReservaModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
