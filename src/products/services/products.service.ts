import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private producRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.producRepo.find();
  }

  async findOne(id: number) {
    const product = await this.producRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    /* const newProduct = new Product();
    newProduct.name = data.name;
    newProduct.description = data.description;
    newProduct.price = data.price;
    newProduct.stock = data.stock;
    newProduct.image = data.image; */
    const newProduct = this.producRepo.create(data);
    return this.producRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.producRepo.findOne(id);
    this.producRepo.merge(product, changes);
    return this.producRepo.save(product);
  }

  remove(id: number) {
    return this.producRepo.delete(id);
  }
}
