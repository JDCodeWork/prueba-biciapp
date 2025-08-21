import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { BikesModule } from 'src/bikes/bikes.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [BikesModule]
})
export class SeedModule { }
