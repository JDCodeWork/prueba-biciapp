import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';

@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) { }

  @Get()
  getAllBikes() {
    return this.bikesService.getAllBikes()
  }

  @Post()
  createBike(
    @Body() createBikeDto: CreateBikeDto
  ) {
    const { no, status } = createBikeDto

    return this.bikesService.createBike(no, status)
  }

  @Delete(':id')
  deleteOneById(
    @Param('id') id: string
  ) {
    return this.bikesService.deleteOneById(id)
  }

  @Delete()
  deleteAllBikes() {
    return this.bikesService.deleteAllBikes()
  }
}
