// ========================================
// LAYER 1: ENTITIES/DOMAIN (Innermost Layer)
// ========================================
// What: Core business objects and rules
// Responsibility: Define what a Product IS and its invariants
// Receives: Nothing (pure business logic)
// Outputs: Validates business rules, throws domain errors
export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    // Business Rule
    if (!name || name.trim().length === 0) {
      throw new Error('Product name cannot be empty');
    }

    if (price <= 0) {
      throw new Error('Product price must be positive');
    }
  }

  // Business method: Calculate discounted price
  calculateDiscountedPrice(discountPercentage: number): number {
    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error('Discount percentage must be between 0 and 100');
    }
    return this.price * (1 - discountPercentage / 100);
  }
}
