import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { ProductService } from 'src/modules/store/application/services/product.service';
import { CreateProductContract } from 'src/modules/store/domain/contracts/create-product.contract';
import { CreateProductDto } from 'src/modules/store/domain/dtos/product/create-product.dto';
import { Result } from 'src/shared/result/result';

// localhost:5000/v1/products
@Controller('v1/products')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateProductContract()))
  async addProduct(@Body() data: CreateProductDto) {
    const res = await this._productService.addProduct(data);

    return new Result('Produto cadastrado com sucesso!', true, res, null);
  }

  @Get(':id')
  async findProduct(@Param('id') id: string) {
    const res = await this._productService.findProductById(id);

    return new Result('Produto encontrado com sucesso!', true, res, null);
  }
}
