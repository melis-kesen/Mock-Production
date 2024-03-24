import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db', // PostgreSQL sunucu adresi
  port: 5432, // PostgreSQL port numarası
  username: 'postgres', // PostgreSQL kullanıcı adı
  password: 'postgres', // PostgreSQL şifre
  database: 'postgres', // PostgreSQL veritabanı adı
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // TypeORM varlık dosyalarının yolu
  //synchronize: true, // Otomatik tablo senkronizasyonunu etkinleştir
};

export default config;
