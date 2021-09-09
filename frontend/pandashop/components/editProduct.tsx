import React from "react";
import {
  Card,
  Col,
  Row,
  List,
  Tag,
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
} from "antd";
import client from "../pages/apollo-client";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../graphql/Mutation";


export const EditeProduct = ({ product }: any) => {

  const {name,stock,description,category,price} = product;
  console.log(product);
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("");
  const [productsData, setProductsData] = React.useState("");
  const [form] = Form.useForm();

  const [updateProduct,{ error }] = useMutation(UPDATE_PRODUCT);
  console.log('el error es',error);
  console;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };
  const onFinish = (values: any) => {
    setProductsData(values.Product);
    console.log(values.Product.name);
    console.log(values.Product.Stock);

    form.resetFields();
    
    try {
    
        updateProduct({
          variables: {
            id: 2,
            name: "omg",
            stock: "4",
            description: "gas",
            category: "Toy",
            price: "5000",
          },
        });
      
    
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>

        <Button type="primary" onClick={showModal}>
          Edit product
        </Button>


      <Modal
        title="Edite product"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["Product", "name"]}
            label="Name"
            initialValue={name}
            rules={[{ required: true }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            initialValue={description}
            name={["Product", "Description"]}
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
           initialValue={category}
            label="Category"
            rules={[{ required: true }]}
            name={["Product", "Category"]}
          >
            <Select defaultValue={category}>
              
              <Select.Option value="Clothes">Clothes</Select.Option>
              <Select.Option value="Home">Home</Select.Option>
              <Select.Option value="Makeup">Makeup</Select.Option>
              <Select.Option value="Shoes">Shoes</Select.Option>
              <Select.Option value="Toy">Toy</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
          initialValue={stock}
            label="Stock"
            rules={[{ required: true }]}
            name={["Product", "Stock"]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
             initialValue={price}
            label="Price $"
            rules={[{ required: true }]}
            name={["Product", "Price"]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
