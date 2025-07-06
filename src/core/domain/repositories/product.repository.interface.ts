import { Product } from 'src/core/domain/entities/product.entity';

// Domain interface for repository (defined in domain, implemented in infrastructure)
export interface ProductRepositoryInterface {
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  save(product: Product): Promise<void>;
}
