import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity } from 'src/films/entities/film_postgres.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(FilmEntity) private filmRep: Repository<FilmEntity>,
  ) {}

  async findAll() {
    return this.filmRep.find({ relations: ['schedule'] });
  }

  async findOne(id: string) {
    const film = await this.filmRep.findOne({
      where: { id },
      relations: ['schedule'],
    });
    return film;
  }
}
