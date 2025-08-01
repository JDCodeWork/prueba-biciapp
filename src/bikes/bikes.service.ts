import { Injectable } from '@nestjs/common';

type BikeStatus = 'disponible' | 'ocupada'
export interface Bike {
  no: number
  status: BikeStatus
}

@Injectable()
export class BikesService {
  bikeList: Bike[] = [
    { no: 10, status: 'disponible' }
  ]

  getAllBikes() {
    return this.bikeList
  }

  createBike(no: number, status: BikeStatus) {
    this.bikeList.push({ no, status })
  }
}
