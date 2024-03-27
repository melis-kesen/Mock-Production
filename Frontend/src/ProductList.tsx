import React, { useState, useEffect } from 'react';
import { Card, Button, Space, message, Row, Col ,Modal, Spin, Result} from 'antd';
import { PushpinOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import 'antd/dist/reset.css';
import {productImage} from "./productImage"
import FormComponent,  { ProductData }  from "./components/Form"
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<any>(null);
  const [spinning, setSpinning] = React.useState<boolean>(true);

  useEffect(() => {
    fetchProductsASC();
    resetProductsPin();
  }, []);
  // get products in asc order
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
   // get products in desc order
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
  // reset pinned products
  const resetProductsPin = async () => {
    try {
      const response = await ProductService.resetProductsPin();
      if (response) {
        setPinnedProducts({})
        fetchProductsASC();
      }
      
    } catch (error) {
      message.error('Error fetching products');
    }
  };
  // pin selected product in selected position
  const handlePinProduct = async (id: number) => {
    try {
      if (positionInput === null) {
        throw new Error('Pin operation cancelled');
      }
      const position: number = parseInt(positionInput, 10);
      if (isNaN(position) || position < 0) {
        throw new Error('Invalid position');
      }
      const response = await ProductService.pinProducts(id, position)
      if (response) {
        fetchProductsASC();
        setPinnedProducts(prevState => ({
          ...prevState,
          [id]: position
        }));
        setPositionInput(null)
        setIsModalOpen(false);
      }
      message.success('Product pinned successfully');
    } catch (error:any) {
      message.error(error.message || 'An error occurred while pinning the product');
    }
  };
  // generate product
  const handleGenerateProduct = async (formData: ProductData ) => {
    setIsFormOpen(true)
    try {
      const generatedProduct = await ProductService.generateProduct(formData);
      if (generatedProduct) {
         fetchProductsASC();
         setIsFormOpen(false)
      }
  } catch (error:any) {
    message.error(error.response.data.message || 'An error occurred while pinning the product');
  }
  }
  //open pin product modal
  const showModal = (productId: any) => {
    setIsModalOpen(true); 
    setSelectedProductId(productId)
  };
  //open generate product form
  const showForm = () => {
    setIsFormOpen(true)
  };
  //click Ok button in pin product modal
  const handleOk = (selectedProductId: number) => {
    handlePinProduct(selectedProductId)
  };
  //click cancel button in pin product modal
  const handleCancel = () => {
    setPositionInput(null)
    setIsModalOpen(false);
  };
  //click cancel button in generate product form
  const handleCancelForm = () => {
    setIsFormOpen(false)
  };
  const onChange = (value: any) => {
    setPositionInput(value);
  };

  return (
    <div>
        <Spin spinning={spinning} size="large" fullscreen/>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Button onClick={() => showForm()}>Generate Product</Button>
          <Button onClick={() => fetchProductsASC()}>Sort by Price Asc</Button>
          <Button onClick={() => fetchProductsDESC()}>Sort by Price Desc</Button>
          <Button onClick={()=>resetProductsPin()}>Reset</Button>
        </Space>
        {(products === null || products.length === 0) && ( <Result
    title="There is no products to show." status="warning"
  />)}
        {products && ( 
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card
               cover={<img key={productImage[product.id-1]?.id} alt={productImage[product.id-1]?.alt} src={productImage[product.id-1]?.image} height={160}/>}
                hoverable
                style={{ marginBottom: '10px'}}
                actions={[
                  <Button type="primary" onClick={() => showModal(product.id)} /*style={{ backgroundColor: pinnedProducts[product.id.toString()] ? '#6ab6cf' : '#b9b4b4' }}*/>
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
        <Modal title="Pin Product" open={isModalOpen} onOk={() =>handleOk(selectedProductId)} onCancel={handleCancel} centered={true} width={300}>
        <InputNumber  min={0} max={products.length} placeholder="Please enter a position" value={positionInput} onChange={onChange}  style={{ width: 200 }}/>
      </Modal>
      </Space>
      <Modal title="Generate Product" open={isFormOpen} centered={true} footer={[
          <Button key="cancel" onClick={handleCancelForm}>
            Cancel
          </Button>,
        ]} ><FormComponent onSubmit={handleGenerateProduct}></FormComponent></Modal>
    </div>
  );
};

export default MockProducts;
