import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';
import { Product } from './entities/Product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Product]), // Entity'leri belirtin
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
