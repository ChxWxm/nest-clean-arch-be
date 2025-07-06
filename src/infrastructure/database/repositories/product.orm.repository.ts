// ========================================
// LAYER 4: FRAMEWORKS/DRIVERS (Database Implementation)
// ========================================
// What: External concerns (database, external APIs, etc.)
// Responsibility: Implement interfaces defined in inner layers
// Receives: Domain objects or simple parameters
// Outputs: Domain objects or simple data

import { Injectable } from '@nestjs/common';
import { Product } from 'src/core/domain/entities/product.entity';
import { ProductRepositoryInterface } from 'src/core/domain/repositories/product.repository.interface';

@Injectable()
export class ProductOrmRepository implements ProductRepositoryInterface {
  private readonly products: Map<string, Product> = new Map();

  constructor() {
    // Initialize with some dummy data
    const product1 = new Product(
      crypto.randomUUID(),
      'Product 1',
      100,
      'Description for product 1',
      new Date(),
      new Date(),
    );
    const product2 = new Product(
      crypto.randomUUID(),
      'Product 2',
      200,
      'Description for product 2',
      new Date(),
      new Date(),
    );
    this.products.set(product1.id, product1);
    this.products.set(product2.id, product2);
    console.log('REPOSITORY: Initialized with dummy products');
  }

  findById(id: string): Promise<Product | null> {
    console.log('REPOSITORY: Finding product by ID:', id);
    const product = this.products.get(id) || null;
    console.log('REPOSITORY: Product found:', !!product);
    return Promise.resolve(product);
  }
  findAll(): Promise<Product[]> {
    console.log('REPOSITORY: Finding all products');
    const allProducts = Array.from(this.products.values());
    return Promise.resolve(allProducts);
  }
  save(product: Product): Promise<void> {
    console.log('REPOSITORY: Saving product:', product.id);
    this.products.set(product.id, product);
    console.log('REPOSITORY: Product saved successfully');
    return Promise.resolve();
  }
}
