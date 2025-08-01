import { Injectable } from '@nestjs/common';

@Injectable()
export class StationsService {
  private stations: any[] = []

  create(name: string) {
    const newStation = { id: this.stations.length + 1, name };

    this.stations.push(newStation);
  }

  findAll() {
    return this.stations;
  }
}
