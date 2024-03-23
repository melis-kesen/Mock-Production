import React, { useState, useEffect } from 'react';
import { Card, Button, Space, message, Row, Col ,Modal} from 'antd';
import { PushpinOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';
import productImage from './productImage.json'; // JSON dosyasını içe aktar
const { Meta } = Card;

interface Product {
  id: number;
  name: string;
  price: number;
  SKU: string;
  stockLevels: number;
  position: number;
}

const MockProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<any>('price');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [pinnedProducts, setPinnedProducts] = useState<{ [key: string]: boolean }>({});
  const [positionInput, setPositionInput] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<any>(null);

  const showModal = (productId: any) => {
    setIsModalOpen(true);
    setSelectedProductId(productId)
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setPositionInput(null)
    setIsModalOpen(false);

  };
  const onChange = (value: any) => {
    setPositionInput(value);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Error fetching products');
    }
  };

  const handlePinProduct = async (id: number) => {
    try {
      if (positionInput === null) {
        throw new Error('Pin operation cancelled');
      }
      const position: number = parseInt(positionInput, 10);
      if (isNaN(position) || position < 1) {
        throw new Error('Invalid position');
      }
      const response = await axios.post(`http://localhost:3001/products/pin/${id}/${position}`);
      if (response) {
        fetchProducts();
        setPinnedProducts(prevState => ({
          ...prevState,
          [id]: position
        }));
        handleOk();
      }
      message.success('Product pinned successfully');
    } catch (error:any) {
      message.error(error.message || 'An error occurred while pinning the product');
    }
  };
  

  const sortedProducts = [...products].sort((a: Product, b: Product) => {
    if (a.position !== undefined && b.position !== undefined) {
      return a.position - b.position; // Pinlenmiş ürünlerin pozisyonlarını korur
    } else {
      return a.price - b.price; // Diğer ürünleri fiyata göre sıralar
    }
  });
  
  return (
    <div style={{ padding: '20px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Button onClick={() => { setSortBy('price'); setSortOrder('asc'); }}>Sort by Price Asc</Button>
          <Button onClick={() => { setSortBy('price'); setSortOrder('desc'); }}>Sort by Price Desc</Button>
        </Space>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {sortedProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card
                cover={<img alt="example" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" height={120}/>}
                hoverable
                style={{ marginBottom: '20px'}}
                actions={[
                  <Button type="primary" onClick={() => showModal(product.id)} style={{ backgroundColor: pinnedProducts[product.id.toString()] ? '#6ab6cf' : '#b9b4b4' }}>
                    <PushpinOutlined  />
                  </Button>,
                ]}
              >
                <Meta
                  title={product.name}
                  description={`Price: $${product.price} | SKU: ${product.SKU} | Stock: ${product.stockLevels}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Modal title="Pin Position" open={isModalOpen} onOk={() =>handlePinProduct(selectedProductId)} onCancel={handleCancel} centered={true} width={300}>
        <InputNumber  min={1} max={products.length} placeholder="Please enter a position" value={positionInput} onChange={onChange}  style={{ width: 200 }}/>
      </Modal>
      </Space>
    </div>
  );
};

export default MockProducts;
