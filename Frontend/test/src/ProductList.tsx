// ProductList.tsx
import React from 'react';
import { Product } from './types';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <h2>Ürün Listesi</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Fiyat: {product.price}</p>
            <p>SKU: {product.SKU}</p>
            <p>Stok Seviyesi: {product.stockLevels}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
