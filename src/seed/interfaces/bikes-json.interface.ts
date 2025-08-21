export interface BikesJsonInterface {
  bikeNo: number;
  image: string;
  thumbnail: string;
  description: string;
  qualifier: number;
  timeStamp: string;
  rating: Rating;
  email: string;
  status?: string;
}

interface Rating {
  handlebar: number;
  brakes: number;
  seat: number;
  chain: number;
  pedals: number;
  fenders: number;
}