import { Body, Controller, Get, Post } from '@nestjs/common';
import { type Bike, BikesService } from './bikes.service';

@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) { }

  @Get()
  getAllBikes(): Bike[] {
    return this.bikesService.getAllBikes()
  }

  @Post()
  createBike(@Body() cuerpo: Bike) {
    return this.bikesService.createBike(cuerpo.no, cuerpo.status)
  }
}
