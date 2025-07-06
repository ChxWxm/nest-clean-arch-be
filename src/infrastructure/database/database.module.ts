import { Module } from '@nestjs/common';
import { ProductService } from 'src/core/application/use-cases/product.service';
import { ProductOrmRepository } from 'src/infrastructure/database/repositories/product.orm.repository';
import { ProductController } from 'src/presentation/controllers/product.controller';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductOrmRepository,
    },
  ],
})
export class DatabaseModule {}
