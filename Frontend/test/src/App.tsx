import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductCard from './ProductCard';
import { Product } from './types';

function App() {
  return (
    <div className="App">
      <h1>PRODUCTS</h1>
      <ProductCard />
    </div>
  );
}

export default App;
