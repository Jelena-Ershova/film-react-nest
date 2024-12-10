import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDTO } from './dto/order.dto';
import { FilmEntity } from '../films/entities/film_postgres.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly repository: Repository<FilmEntity>,
  ) {}

  async create(createOrderDTO: OrderDTO) {
    const { tickets } = createOrderDTO;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;

      const findFilm = await this.repository.findOne({
        where: { id: film },
        relations: ['schedule'],
      });
      if (!findFilm) {
        throw new NotFoundException(`Фильм ${film} не найден.`);
      }

      const schedule = findFilm.schedule.find((s) => s.id === session);
      if (!schedule) {
        throw new NotFoundException(
          `Сеанс ${session} к фильму ${findFilm.title} не найден.`,
        );
      }

      const row_seat = `${row}:${seat}`;

      const seats_taken = schedule.taken.split(',');
      if (seats_taken.includes(row_seat)) {
        throw new BadRequestException(
          `Ряд ${row} место ${seat} на фильм '${findFilm.title}' на ${schedule.daytime} уже занято.`,
        );
      }
      if (schedule.taken) {
        const newTaken = schedule.taken.concat(`,${row_seat}`);
        schedule.taken = newTaken;
      } else {
        schedule.taken = row_seat;
      }

      await this.repository.save(findFilm);
    }

    return { items: tickets, total: tickets.length };
  }
}
