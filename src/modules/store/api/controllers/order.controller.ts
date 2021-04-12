import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { Result } from 'src/shared/helpers/result.helper';
import { OrderService } from 'src/modules/store/application/services/order.service';
import { CreateOrderContract } from 'src/modules/store/domain/contracts/create-order.contract';
import { CreateOrderDto } from 'src/modules/store/domain/dtos/order/create-order.dto';

// localhost:5000/v1/orders
@Controller('v1/orders')
export class OrderController {
  constructor(private readonly _orderService: OrderService) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateOrderContract()))
  async createOrder(@Body() data: CreateOrderDto) {
    const res = await this._orderService.createOrder(data);

    return new Result('Pedido cadastrado com sucesso!', true, res, null);
  }
}
