import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAllFilms() {
    return this.filmsService.findAll();
  }

  @Get('/:id/schedule')
  getSheduleById(@Param('id') filmID: string) {
    return this.filmsService.findOne(filmID);
  }
}
