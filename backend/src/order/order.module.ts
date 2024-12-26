import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from 'src/films/entities/film_postgres.entity';
import { FilmsRepository } from '../repository/film_postgres.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity])],
  controllers: [OrderController],
  providers: [OrderService, FilmsRepository],
})
export class OrderModule {}
