import { Module } from '@nestjs/common';
import { ParkingSpotController } from './parking-spot.controller';
import { ParkingSpotService } from './providers/parking-spot.service';

@Module({
    controllers: [ParkingSpotController],
    providers: [ParkingSpotService],
})
export class ParkingSpotModule { }
