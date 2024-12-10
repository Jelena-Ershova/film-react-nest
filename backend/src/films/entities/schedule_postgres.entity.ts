import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FilmEntity } from './film_postgres.entity';

@Entity({
  name: 'schedules',
})
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Идентификатор расписания',
    name: 'id',
  })
  readonly id: string;

  @Column('varchar', {
    comment: 'Дата',
  })
  daytime: string;

  @Column('integer', {
    comment: 'Зал',
  })
  hall: number;

  @Column('float', {
    comment: 'Цена',
  })
  price: number;

  @Column('integer', {
    comment: 'Ряд',
  })
  rows: number;

  @Column('integer', {
    comment: 'Место',
  })
  seats: number;

  @Column('simple-array', {
    comment: 'Ряд:Место',
    array: true,
    default: [],
  })
  taken: string[];

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  film: FilmEntity;
}
