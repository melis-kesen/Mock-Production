import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/Product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async getAllProducts(
    orderBy: string = 'price',
    orderDirection: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Product[]> {
    const products = await this.productRepository.find();
    const productsNotPinned = await this.productRepository.find({
      where: {
        IsPinned: false, // IsPinned değeri true olmayanları getir
      },
      order: {
        [orderBy]: orderDirection,
      },
    });
    const productsPinned = await this.productRepository.find({
      where: {
        IsPinned: true, // IsPinned değeri true olanları getir
      },
    });

    const pinnedPositions = products
      .filter((obj) => obj.IsPinned === true)
      .map((obj) => obj.position);

    // Her sabit konumu ele al
    pinnedPositions.forEach((pinnedIndex, index) => {
      // Sabit konum indeksine ilgili sabit konumdaki ürünü ekle
      const pinnedProduct = productsPinned[index]; // Doğru sabit konumda olan ürünü al
      if (pinnedProduct) {
        productsNotPinned.splice(pinnedIndex, 0, pinnedProduct);
      }
    });

    for (let index = 0; index < productsNotPinned.length; index++) {
      const product = productsNotPinned[index];
      await this.productRepository.update(
        { id: product.id },
        { position: index },
      );
    }
    return productsNotPinned;
  }
  async pinProduct(id: number, position: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id: id } });

    const existingProductAtPosition = await this.productRepository.findOne({
      where: { position: position },
    });
    if (existingProductAtPosition) {
      // Belirtilen pozisyonda bir ürün varsa, pozisyonları değiştir
      existingProductAtPosition.position = product.position;
      await this.productRepository.save(existingProductAtPosition);
    }

    product.position = position; // Ürünün pozisyonunu güncelle
    product.IsPinned = true; // Ürünün pozisyonunu güncelle
    await this.productRepository.save(product); // Ürünü veritabanına kaydet
    return product; // Güncellenmiş ürünü döndür
  }

  async unpinProducts() {
    // IsPinned değeri true olan tüm ürünleri false olarak güncelle
    await this.productRepository.update(
      { IsPinned: true },
      { IsPinned: false },
    );
    return true;
  }

  async generateProduct(productData: any) {
    try {
      const existingProduct = await this.productRepository.findOne({
        where: { SKU: productData.SKU },
      });
      if (existingProduct) {
        throw new ConflictException('SKU must be unique');
      }

      const newProductData = { ...productData, IsPinned: false };

      const newProduct = this.productRepository.create(newProductData);
      return this.productRepository.save(newProduct);
    } catch (error) {
      throw error;
    }
  }
}
