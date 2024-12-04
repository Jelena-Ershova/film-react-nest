import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/order')
  async create(@Body() createOrderDTO: OrderDTO) {
    return this.orderService.create(createOrderDTO);
  }
}
