import {
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('asc')
  async getAllProductsASC() {
    return this.productService.getAllProducts('price', 'ASC');
  }
  @Get('desc')
  async getAllProductsDESC() {
    return this.productService.getAllProducts('price', 'DESC');
  }
  @Post('pin/:id/:position')
  async pinProduct(
    @Param('id') id: number,
    @Param('position') position: number,
  ) {
    // productId ve position değerlerini alarak pinProduct metodu çağrılır
    if (isNaN(position) || position < 0) {
      throw new BadRequestException('Invalid position'); // Pozisyon değeri hatalıysa istemciye bir hata döndürülür
    }
    const pinnedProduct = await this.productService.pinProduct(id, position); // ProductService'deki pinProduct metodu çağrılır
    if (!pinnedProduct) {
      throw new NotFoundException('Product not found'); // Belirtilen ID'ye sahip ürün bulunamazsa istemciye bir hata döndürülür
    }
    return pinnedProduct; // Pinlenmiş ürün başarıyla döndürülür
  }
  @Post('unpin')
  async unpinProducts() {
    return this.productService.unpinProducts(); // ProductService'deki pinProduct metodu çağrılır
  }
  @Post()
  async generateProduct(@Body() productData: any) {
    try {
      return await this.productService.generateProduct(productData);
    } catch (error) {
      throw error;
    }
  }
}
