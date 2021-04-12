import { Body, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { Result } from 'src/shared/helpers/result.helper';
import { ProductService } from 'src/modules/store/application/services/product.service';
import { CreateProductContract } from 'src/modules/store/domain/contracts/create-product.contract';
import { CreateProductDto } from 'src/modules/store/domain/dtos/product/create-product.dto';
import { UpdateProductDto } from 'src/modules/store/domain/dtos/product/update-product.dto';

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

  @Put(':id')
  @UseInterceptors(new ValidatorInterceptor(new CreateProductContract()))
  async updateProduct(@Param('id') id: string, @Body() data: UpdateProductDto) {
    await this._productService.updateProduct(id, data);

    return new Result('Produto atualizado com sucesso!', true, data, null);
  }
}
