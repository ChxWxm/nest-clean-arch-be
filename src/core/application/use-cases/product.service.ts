// ========================================
// LAYER 2: USE CASES (Application Layer)
// ========================================
// What: Application-specific business rules
// Responsibility: Orchestrate the flow of data, apply business rules
// Receives: Simple data from controllers
// Outputs: Domain objects or simple data to controllers

import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/core/domain/entities/product.entity';
import { ProductRepositoryInterface } from 'src/core/domain/repositories/product.repository.interface';

export class CreateProduct {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly description: string,
  ) {}
}

@Injectable()
export class ProductService {
  // ========================================
  // DEPENDENCY INJECTION SETUP
  // ========================================
  // Update the ProductService to use the injected repository
  // @Inject() decorator to tell NestJS to use that specific token for injection
  constructor(
    @Inject('ProductRepositoryInterface')
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  // USE CASE: Get Product by ID
  // Thought Process:
  // 1. Validate ID format if needed
  // 2. Fetch from repository
  // 3. Handle not found case
  async getProductById(id: string) {
    console.log('USE CASE: Fetching product by ID:', id);
    if (!id || id.trim().length === 0) {
      throw new Error('Product ID cannot be empty');
    }

    const product = await this.productRepository.findById(id);
    if (!product) {
      console.log('USE CASE: Product not found');
      throw new Error('Product not found');
    }

    return product;
  }

  // USE CASE: Get All Products
  // Thought Process:
  // 1. Fetch all products from repository
  // 2. Could apply business logic here (filtering, sorting, etc.)
  // 3. Return products
  getAllProducts(): Promise<Product[]> {
    console.log('USE CASE: Fetching all products from repository');
    return this.productRepository.findAll();
  }

  // USE CASE: Create Product
  // Thought Process:
  // 1. Validate business rules (done in Product constructor)
  // 2. Generate unique ID
  // 3. Save to repository
  // 4. Return the created product
  async createProduct(product: CreateProduct): Promise<Product> {
    console.log('USE CASE: Creating product with command:', product);

    // Generate unique ID (business decision: use UUID)
    const id = crypto.randomUUID();
    const now = new Date();
    const { name, price, description } = product;

    // Create domain object (this validates business rules)
    const newProduct = new Product(id, name, price, description, now, now);
    console.log(
      'USE CASE: Product domain object created, saving to repository',
    );
    await this.productRepository.save(newProduct);
    console.log('USE CASE: Product saved successfully');
    return newProduct;
  }
}
