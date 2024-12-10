import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/film_postgres.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    const films = await this.filmsRepository.findAll();
    const total = films ? films.length : 0;
    return { total: total, items: films };
  }

  async findOne(id: string) {
    const film = await this.filmsRepository.findOne(id);
    const total = film ? film.schedule.length : 0;
    return { total: total, items: film.schedule };
  }
}
