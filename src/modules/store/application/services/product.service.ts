import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from 'src/modules/store/domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly _productRepository: Repository<ProductEntity>) {}

  public async get(): Promise<ProductEntity[]> {
    return await this._productRepository.find();
  }

  public async post(product: ProductEntity): Promise<void> {
    await this._productRepository.save(product);
  }

  public async put(id: string, product: ProductEntity): Promise<void> {
    await this._productRepository.update(id, product);
  }

  public async delete(id: string): Promise<void> {
    await this._productRepository.delete(id);
  }
}
