import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/Product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // PostgreSQL sunucu adresi
      port: 5432, // PostgreSQL port numarası
      username: 'postgres', // PostgreSQL kullanıcı adı
      password: 'postgres', // PostgreSQL şifre
      database: 'postgres', // PostgreSQL veritabanı adı
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // TypeORM varlık dosyalarının yolu
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
