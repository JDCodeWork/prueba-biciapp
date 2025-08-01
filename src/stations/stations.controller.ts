import { Controller, Get, Post, Body } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) { }

  @Post()
  create(@Body() { name }: { name: string }) {
    return this.stationsService.create(name);
  }

  @Get()
  findAll() {
    return this.stationsService.findAll();
  }
}
