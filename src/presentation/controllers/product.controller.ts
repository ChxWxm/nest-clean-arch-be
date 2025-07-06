// ========================================
// LAYER 3: INTERFACE ADAPTERS (Controllers & DTOs)
// ========================================
// What: Convert between external format and application format
// Responsibility: Handle HTTP concerns, validate input, transform data
// Receives: HTTP requests (JSON)
// Outputs: HTTP responses (JSON)

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateProduct,
  ProductService,
} from 'src/core/application/use-cases/product.service';
import { CreateProductDto } from 'src/presentation/dtos/create-product.dto';
import { ProductResponseDto } from 'src/presentation/dtos/product-response.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // CONTROLLER: Get Product by ID
  // Thought Process:
  // 1. Validate ID parameter
  // 2. Call use case
  // 3. Transform domain object to response DTO
  // 4. Handle not found case with appropriate HTTP status
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    console.log('CONTROLLER: Received get product by ID request');

    try {
      const product = await this.productService.getProductById(id);
      console.log('CONTROLLER: Product retrieved, transforming response');
      return ProductResponseDto.fromDomain(product);
    } catch (error) {
      console.error('CONTROLLER: Error getting product by ID:', error.message);
      if (error.message === 'Product not found') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // CONTROLLER: Get All Products
  // Thought Process:
  // 1. No input validation needed
  // 2. Call use case
  // 3. Transform domain objects to response DTOs
  @Get()
  async getAllProducts() {
    console.log('CONTROLLER: Received get all products request');

    try {
      const products = await this.productService.getAllProducts();
      console.log('CONTROLLER: Products retrieved, transforming response');
      return products.map((product) => ProductResponseDto.fromDomain(product));
    } catch (error) {
      console.error('CONTROLLER: Error getting products:', error.message);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // CONTROLLER: Create Product
  // Thought Process:
  // 1. Validate incoming HTTP request (done by DTOs)
  // 2. Transform DTO to Use Case command
  // 3. Call use case
  // 4. Transform domain object to response DTO
  // 5. Handle errors and return appropriate HTTP status
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    console.log('CONTROLLER: Received create product request');

    try {
      // Transform DTO to Use Case command
      const command = new CreateProduct(
        createProductDto.name,
        createProductDto.price,
        createProductDto.description,
      );

      console.log('CONTROLLER: Calling use case with command');
      const product = await this.productService.createProduct(command);
      console.log('CONTROLLER: Product created, transforming response');
      return ProductResponseDto.fromDomain(product);
    } catch (error) {
      console.error('CONTROLLER: Error creating product:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
