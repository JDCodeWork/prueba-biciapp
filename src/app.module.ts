import { Module } from '@nestjs/common';
import { BikesModule } from './bikes/bikes.module';
import { StationsModule } from './stations/stations.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      autoLoadEntities: true,
      synchronize: true
    }),
    BikesModule,
    StationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
