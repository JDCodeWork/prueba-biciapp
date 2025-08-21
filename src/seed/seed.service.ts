import { Injectable } from '@nestjs/common';

import jsonBikesData from './data/bikes.json'
import { BikesJsonMapper } from './mappers/bikes-json.mapper';
import { BikesService } from 'src/bikes/bikes.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly bikesService: BikesService
  ) { }

  async populateBikesInDB() {
    // para evitar errores de datos duplicados
    await this.bikesService.deleteAllBikes()

    const formattedBikes = new BikesJsonMapper(jsonBikesData).toCreateBikeDto()

    // No se van a ejecutar (no hay contacto con db)
    /* 
        let newBikesPromises: Promise<void>[]
    
        formattedBikes.forEach(bikeDto => {
          newBikesPromises.push(this.bikesService.createBike(bikeDto.no, bikeDto.status))
        })
    */
    const newBikesPromises = formattedBikes.map(bikeDto => {
      return this.bikesService.createBike(bikeDto.no, bikeDto.status)
    })

    // Se ejecutan todas las promesas
    await Promise.all(newBikesPromises)
  }

}
