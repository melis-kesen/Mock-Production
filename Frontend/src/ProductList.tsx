import React, { useState, useEffect } from 'react';
import { Card, Button, Space, message, Row, Col ,Modal, Spin} from 'antd';
import { PushpinOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import 'antd/dist/reset.css';
import {productImage} from "./productImage"
//services
import ProductService from "./service/product.service"
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
  const [pinnedProducts, setPinnedProducts] = useState<{ [key: string]: boolean }>({});
  const [positionInput, setPositionInput] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<any>(null);
  const [spinning, setSpinning] = React.useState<boolean>(true);

  useEffect(() => {
    fetchProductsASC();
    setPinnedProducts({})
  }, []);

  const fetchProductsASC = async () => {
    setSpinning(true);
    try {
      const productsAsc = await ProductService.getProductsAsc();
      setProducts(productsAsc);
      setSpinning(false);
    } catch (error) {
      message.error('Error fetching products');
    }
  };
  const fetchProductsDESC = async () => {
    setSpinning(true);
    try {
      const productsDesc = await ProductService.getProductsDesc();
      setProducts(productsDesc);
      setSpinning(false);
    } catch (error) {
      message.error('Error fetching products');
    }
  };
  const resetProductsPin = async () => {
    setSpinning(true);
    try {
      const response = await ProductService.resetProductsPin();
      if (response) {
        setPinnedProducts({})
        fetchProductsASC();
        setSpinning(false);
      }
      
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
      const response = await ProductService.pinProducts(id, position)
      if (response) {
        fetchProductsASC();
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
  
  return (
    <div>
        <Spin spinning={spinning} size="large" fullscreen/>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Button onClick={() => fetchProductsASC()}>Sort by Price Asc</Button>
          <Button onClick={() => fetchProductsDESC()}>Sort by Price Desc</Button>
          <Button onClick={()=>resetProductsPin()}>Reset</Button>
        </Space>
        {products && ( 
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card
                cover={<img key={productImage[product.id-1]?.id} alt={productImage[product.id-1]?.alt} src={productImage[product.id-1]?.image} height={160}/>}
                hoverable
                style={{ marginBottom: '10px'}}
                actions={[
                  <Button type="primary" onClick={() => showModal(product.id)} style={{ backgroundColor: pinnedProducts[product.id.toString()] ? '#6ab6cf' : '#b9b4b4' }}>
                    <PushpinOutlined  />
                  </Button>
                ]}
              >
                <Meta
                  title={product.name}
                  description={`Price: $${product.price} | SKU: ${product.SKU} | Stock: ${product.stockLevels}`}
                />
              </Card>
            </Col>
          ))}
        </Row>)}
       
        <Modal title="Pin Position" open={isModalOpen} onOk={() =>handlePinProduct(selectedProductId)} onCancel={handleCancel} centered={true} width={300}>
        <InputNumber  min={1} max={products.length} placeholder="Please enter a position" value={positionInput} onChange={onChange}  style={{ width: 200 }}/>
      </Modal>
      </Space>
     
    </div>
  );
};

export default MockProducts;
