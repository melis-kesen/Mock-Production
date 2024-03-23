// create-product.dto.ts
export class CreateProductDto {
  name: string;
  price: number;
  SKU: string;
  stockLevels: number;
  position: number;
  IsPinned: boolean;
}
