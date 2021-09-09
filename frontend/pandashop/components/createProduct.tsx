import React from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Result,
  message,
} from "antd";

const openMessage = () => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.success({ content: "Loaded!", key, duration: 2 });
  }, 1000);
};
const key = "updatable";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../graphql/Mutation";

export const CreateProduct = ({ product }: any) => {
  const { name, stock, description, category, price, id } = product;

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("");
  const [form] = Form.useForm();

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

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
    try {
      if (id) {
        updateProduct({
          variables: {
            id: parseInt(id),
            name: values.Product.name,
            stock: values.Product.Stock,
            description: values.Product.Description,
            category: values.Product.Category,
            price: values.Product.Price,
          },
        });
        form.resetFields();
      } else {
        createProduct({
          variables: {
            name: values.Product.name,
            stock: values.Product.Stock.toString(),
            description: values.Product.Description,
            category: values.Product.Category,
            price: values.Product.Price.toString(),
          },
        });
        form.resetFields();
      }
    } catch (error) {}
  };

  return (
    <>
      {product.id ? (
        <Button type="primary" onClick={showModal}>
          Edit product
        </Button>
      ) : (
        <Button type="primary" onClick={showModal}>
          Create Product
        </Button>
      )}

      <Modal
        title={product.id ? "Edit product" : "Create Product"}
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
            <Input />
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
            <Button type="primary" onClick={openMessage} htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
