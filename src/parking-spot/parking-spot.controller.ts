import { Body, Controller, Post } from '@nestjs/common';
import { ParkingSpotService } from './providers/parking-spot.service';
import { CreateParkingSpotDto } from './dtos/create-parkin-spot.dto';

@Controller('parking-spot')
export class ParkingSpotController {
    constructor(
        /**
         * Inject parkingSpotService 
         */

        private readonly parkingSpotService: ParkingSpotService
    ) { }

    @Post()
    public create(@Body() createparkingSpotDto: CreateParkingSpotDto) {

    }
}
