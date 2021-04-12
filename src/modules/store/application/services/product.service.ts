import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Result } from 'src/shared/helpers/result.helper';
import { ProductEntity } from 'src/modules/store/domain/entities/product.entity';
import { CreateProductDto } from 'src/modules/store/domain/dtos/product/create-product.dto';
import { UpdateProductDto } from 'src/modules/store/domain/dtos/product/update-product.dto';
import { PaginationQueryDto } from 'src/shared/pagination/pagination-query.dto';

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

  public async findProducts(query: PaginationQueryDto): Promise<ProductEntity[]> {
    try {
      const products = await this._productRepository.find({
        where: { title: Like('%' + query.keyword + '%') },
        order: { title: 'DESC' },
        take: query.take,
        skip: query.skip,
      });

      if (products.length === 0) {
        throw new NotFoundException();
      }

      return products;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(new Result('Nenhum produto encontrado.', false, null, error));
      }

      throw new HttpException(
        new Result('Ocorreu um erro ao buscar produtos.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async findProductById(id: string): Promise<ProductEntity> {
    try {
      const product = await this._productRepository.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException();
      }

      return product;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(new Result('Produto não encontrado.', false, null, error));
      }

      throw new HttpException(
        new Result('Ocorreu um erro ao buscar produto.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async updateProduct(id: string, data: UpdateProductDto): Promise<ProductEntity> {
    try {
      const product = await this.findProductById(id);

      if (!product) {
        throw new NotFoundException();
      }

      await this._productRepository.update(product.id, data);

      return product;
    } catch (error) {
      throw new HttpException(
        new Result('Ocorreu um erro ao atualizar dados do produto.', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async deleteProduct(id: string): Promise<void> {
    await this._productRepository.delete(id);
  }
}
