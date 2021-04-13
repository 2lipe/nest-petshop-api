import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Result } from 'src/shared/helpers/result.helper';
import { OrderService } from 'src/modules/store/application/services/order.service';
import { OrderItemService } from 'src/modules/store/application/services/order-item.service';
import { ProductService } from 'src/modules/store/application/services/product.service';
import { OrderEntity } from 'src/modules/store/domain/entities/order.entity';
import { OrderItemEntity } from 'src/modules/store/domain/entities/order-item.entity';
import { CreateOrderMinDto } from 'src/modules/store/domain/dtos/order/create-order-min.dto';

// localhost:5000/v1/orders
@Controller('v1/orders')
export class OrderController {
  constructor(
    private readonly _orderService: OrderService,
    private readonly _orderItemService: OrderItemService,
    private readonly _productService: ProductService,
  ) {}

  @Post()
  async createOrder(@Body() data: CreateOrderMinDto[]) {
    // eslint-disable-next-line prefer-const
    let order = new OrderEntity();
    order.customer = '12345678911'; // Vem do Token (JWT)
    order.date = new Date();
    order.number = '1B2D3F5';
    order.items = [];

    for (const item of data) {
      // eslint-disable-next-line prefer-const
      let product = await this._productService.findProductById(item.product);
      // eslint-disable-next-line prefer-const
      let orderItem = new OrderItemEntity();
      orderItem.order = order;
      orderItem.product = product;
      orderItem.price = product.price;
      orderItem.quantity = item.quantity;

      await this._orderItemService.addOrderItem(orderItem);
    }

    return new Result('Pedido cadastrado com sucesso!', true, data, null);
  }

  @Get(':order')
  async getOrder(@Param('order') orderNumber: string) {
    const order = await this._orderService.getByNumber(orderNumber);

    return new Result('Busca por pedido realizada com sucesso.', true, order, null);
  }

  @Get(':customer')
  async getCustomerOrder(@Param('customer') customerDocument: string) {
    const orders = await this.getCustomerOrder(customerDocument);

    return new Result('Busca de pedidos por cliente realizada com sucesso.', true, orders, null);
  }
}
