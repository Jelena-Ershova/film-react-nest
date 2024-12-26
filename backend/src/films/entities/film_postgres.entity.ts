import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ScheduleEntity } from './schedule_postgres.entity';

@Entity({
  name: 'films',
})
export class FilmEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Идентификатор фильма',
    name: 'id',
  })
  id: string;

  @Column('float', {
    comment: 'Рейтинг фильма',
  })
  rating: number;

  @Column('varchar', {
    comment: 'Режиссер',
  })
  director: string;

  @Column('text', {
    comment: 'Метка',
    array: true,
  })
  tags: string[];

  @Column('varchar', {
    comment: 'Ссылка на картинку',
  })
  image: string;

  @Column('varchar', {
    comment: 'Картинка',
  })
  cover: string;

  @Column('varchar', {
    comment: 'Название',
  })
  title: string;

  @Column('varchar', {
    comment: 'Про фильм',
  })
  about: string;

  @Column('varchar', {
    comment: 'Описание',
  })
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film, {
    cascade: true,
  })
  schedule: ScheduleEntity[];
}
