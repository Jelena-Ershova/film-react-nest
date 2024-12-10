import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './entities/film_postgres.entity';
import { FilmsRepository } from '../repository/film_postgres.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
})
export class FilmsModule {}
