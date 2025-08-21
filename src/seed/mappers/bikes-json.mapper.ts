import { type CreateBikeDto } from "src/bikes/dto/create-bike.dto";
import { BikesJsonInterface } from "../interfaces/bikes-json.interface";

export class BikesJsonMapper {
  constructor(
    private bikesJsonData: BikesJsonInterface[]
  ) { }

  toCreateBikeDto(): CreateBikeDto[] {
    const formattedBikes: CreateBikeDto[] = this.bikesJsonData.map(bike => {
  /* 
      let randomStatus: string;

      if (Math.random() < 0.5) {
        randomStatus = 'disponible';
      } else {
        randomStatus = 'ocupada';
      }
  */
      const randomStatus = Math.random() < 0.5
        ? 'disponible'
        : 'ocupada'

      return {
        no: bike.bikeNo,
        status: randomStatus
      }
    })

    return formattedBikes
  }
}