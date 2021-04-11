import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from 'src/modules/store/domain/entities/product.entity';
import { CreateProductDto } from 'src/modules/store/domain/dtos/product/create-product.dto';
import { Result } from 'src/shared/result/result';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly _productRepository: Repository<ProductEntity>) {}

  public async addProduct(data: CreateProductDto): Promise<ProductEntity> {
    try {
      const product = this._productRepository.create(data);

      await this._productRepository.save(product);

      return product;
    } catch (error) {
      throw new HttpException(
        new Result('Ocorreu um erro ao cadastrar novo produto.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async findAllProducts(): Promise<ProductEntity[]> {
    return await this._productRepository.find();
  }

  public async findPoduct(): Promise<ProductEntity> {
    return await this._productRepository.findOne();
  }

  public async updateProduct(id: string, product: ProductEntity): Promise<void> {
    await this._productRepository.update(id, product);
  }

  public async deleteProduct(id: string): Promise<void> {
    await this._productRepository.delete(id);
  }
}
