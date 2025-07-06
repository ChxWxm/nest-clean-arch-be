import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

// DTOs for input validation
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  description: string;
}
