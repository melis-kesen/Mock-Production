import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost', // PostgreSQL sunucu adresi
  port: 5432, // PostgreSQL port numarası
  username: 'postgres', // PostgreSQL kullanıcı adı
  password: 'rabarba', // PostgreSQL şifre
  database: 'Test', // PostgreSQL veritabanı adı
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // TypeORM varlık dosyalarının yolu
  synchronize: true, // Otomatik tablo senkronizasyonunu etkinleştir
};

export default config;
