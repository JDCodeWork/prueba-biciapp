import { Module } from '@nestjs/common';
import { BikesModule } from './bikes/bikes.module';
import { StationsModule } from './stations/stations.module';

@Module({
  imports: [BikesModule, StationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
