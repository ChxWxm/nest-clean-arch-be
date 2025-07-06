import { Product } from 'src/core/domain/entities/product.entity';

export class ProductResponseDto {
  id: string;
  name: string;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;

  static fromDomain(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };
  }
}
