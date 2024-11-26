import { Injectable } from '@nestjs/common';
import { FilmDocument } from '../films/entities/film.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('Film') private filmModel: Model<FilmDocument>) {}

  async findAll() {
    return this.filmModel.find({});
  }

  async findOne(id: string) {
    const film = await this.filmModel.findOne({ id });
    return film;
  }
}
