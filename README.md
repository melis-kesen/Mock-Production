# Mock Production

Application that includes a backend server, a frontend interface, and utilizes a PostgreSQL database. The application will manage a catalog of mock products, allowing users to sort, pin, and view these products.

## Installation

Use the package manager [npm](https://www.npmjs.com) to install node modules.

```bash
cd Frontend
npm install 
```

```bash
cd Backend
npm install 
```
##### Frontend:
```bash
cd Frontend
npm start 
```
##### Backend:
```bash
cd Backend
npm run start 
```
## Docker

```bash
docker-compose up --build
```

## Usage

```text
- docker-compose up --build çalıştırılır.
- build tamamlandığında localhost:3000 adresi açılır. Veri tabanında product olmadığı için veri görünmeyecektir.
- Generate butonuna tıklandığında bir dialog açılır.Burada:
   Örn: - Product Name: Product 1
        - Price: (Integer değer olarak kabul edilmiştir)
        - SKU: SKU123(Unique değer olarak kabul edilmiştir)
        - Stock Level: 50
- Submit butonuna tıklandığında product kaydedilir.
- Proje içerisinde görsellik açısından default olarak 12 adet product resmi eklenmiştir. 

### Olası Hatalar ###
- Build tamamlandığında Product tablosu otomatik olarak boş bir şekilde oluşmaktadır.Bunun oluşmadığı durum söz konusu ise:
   - localhost:5050 adresinden pgadmin paneline gidilir:
      mail: admin@admin.com
      password: pgadmin4
   - Server'a sağ tık yapılarak Register>Server denilir.
     General>Name: Test
     Connection>Host: db
     Connection>Port: 5432
     Connection>Database: postgres
     Connection>Password: postgres 

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.


## Stay in touch

- Author - [Melis Keşen](https://www.linkedin.com/in/meliskesen/)
- Website - [https://melis-kesen.github.io/Portfolio/](https://melis-kesen.github.io/Portfolio/)

## License
