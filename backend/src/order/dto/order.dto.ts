//TODO реализовать DTO для /orders
import { IsString, IsNumber, IsEmail, IsArray } from 'class-validator';

export class TicketDTO {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsString()
  day: string;

  @IsString()
  time: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class OrderDTO {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  tickets: TicketDTO[];
}
