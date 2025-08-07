import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from './entities/bike.entity';

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>
  ) { }

  async getAllBikes() {
    const allBikes = await this.bikeRepository.find()

    return allBikes
  }

  async createBike(no: number, status: string) {
    const newBike = this.bikeRepository.create({
      no,
      status
    })

    await this.bikeRepository.save(newBike)
  }

  async deleteOneById(id: string) {
    const isExistingBike = await this.bikeRepository.findBy({ id })

    if (isExistingBike) {
      return this.bikeRepository.delete({ id })
    } else {
      return 'La cicla no existe'
    }

  }

  deleteAllBikes() {
    return this.bikeRepository.deleteAll()
  }
}
