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
    const allBikes = await this.bikeRepository.find({
      relations: {
        comments: true
      },
      select: {
        comments: {
          rating: true,
          value: true
        }
      }
    })

    const formattedBikes = allBikes.map(bike => {
      const { comments, ...bikeData } = bike

      const sumOfRatings = comments.reduce((acc, curr) => acc += curr.rating, 0)
      let rating = sumOfRatings / comments.length // NaN -> Not a Number

      if (isNaN(rating)) {
        rating = 0
      }

      const formattedComments = comments.map(comment => {
        return {
          rating: comment.rating,
          comment: comment.value
        }
      })

      return {
        ...bikeData,
        rating,
        comments: formattedComments
      }
    })

    return formattedBikes
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
