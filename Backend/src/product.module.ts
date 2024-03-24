import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './entities/Product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // PostgreSQL sunucu adresi
      port: parseInt(process.env.DB_PORT), // PostgreSQL port numarası
      username: process.env.DB_USERNAME, // PostgreSQL kullanıcı adı
      password: process.env.DB_PASSWORD, // PostgreSQL şifre
      database: process.env.DB_DATABASE, // PostgreSQL veritabanı adı
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
