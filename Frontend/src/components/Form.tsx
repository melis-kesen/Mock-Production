import React from 'react';
import { Button, Form, Input, Slider, Space } from 'antd';
import InputNumber from 'rc-input-number';

interface FormProps {
    onSubmit: (formData: ProductData) => void;
  }
export interface ProductData {
    name: string;
    SKU: string;
    price: Number;
    stockLevels: Number;
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormComponent: React.FC<FormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onSubmit(values); 
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      //onOkForm={() => onReset()}
      //onCancelForm={onReset}
    >
      <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[
            { required: true },
            {
            validator: (_, value) => {
                if (value && !Number.isInteger(value)) {
                return Promise.reject(new Error('Price must be an integer'));
                }
                return Promise.resolve();
            },
            },
        ]}
        >
        <InputNumber />
        </Form.Item>
      <Form.Item name="SKU" label="SKU" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="stockLevels" label="Stock Level" rules={[{ required: true }]}>
      <Slider />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
     { <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>  }
    </Form>
  );
};

export default FormComponent;