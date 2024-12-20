import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema } from '../films/entities/film.entity';
import { FilmsRepository } from '../repository/films.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])],
  controllers: [OrderController],
  providers: [OrderService, FilmsRepository],
})
export class OrderModule {}
