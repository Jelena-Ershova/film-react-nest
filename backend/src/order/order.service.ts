import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly repository: FilmsRepository) {}

  async create(createOrderDTO: OrderDTO) {
    const { tickets } = createOrderDTO;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;

      const findFilm = await this.repository.findOne(film);
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
      if (schedule.taken.includes(row_seat)) {
        throw new BadRequestException(
          `Ряд ${row} место ${seat} на фильм '${findFilm.title}' на ${schedule.daytime} уже занято.`,
        );
      }

      schedule.taken.push(row_seat);

      await findFilm.save();
    }

    return { items: tickets, total: tickets.length };
  }
}
