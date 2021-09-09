import React from "react";
import { Card, Col, Row, List, Tag, Button, Modal } from "antd";
import { Popconfirm, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import Image from "next/image";
import * as Clothes from "./images/Clothes.png";
import Home from "./images/home.png";
import MakeUp from "./images/makeup.png";
import Shoes from "./images/shoes.png";
import Toy from "./images/toystore.png";
import { Header } from "./header";
import { CreateProduct } from "./createProduct";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "../graphql/Mutation";

export const Products = ({ products, loading }: any) => {
  var title = "";
  const { confirm } = Modal;
  const [deleteProduct, { error }] = useMutation(DELETE_PRODUCT);
  console.log(products);

  function confirmDelete(e: any) {
    deleteProduct({ variables: { id: e } });
    console.log("OK");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
    message.success("Se ha eliminado");
  }

  function cancelDelete() {
    message.error("Click on No");
  }

  return (
    <>
      <Header />
      <CreateProduct product={[(title = "Create Product")]} />

      {loading ? (
        "loading..."
      ) : (
        <div className="site-card-wrapper">
          <Row>
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={products}
              renderItem={(item: any) => (
                <List.Item>
                  <Col span={100}>
                    <Card bordered={false} style={{ width: 300 }}>
                      {item.category == "Home" ? (
                        <Image src={Home} alt="" />
                      ) : item.category == "Makeup" ? (
                        <Image src={MakeUp} alt="" />
                      ) : item.category == "Shoes" ? (
                        <Image src={Shoes} alt="" />
                      ) : item.category == "Clothes" ? (
                        <Image src={Clothes} alt="" />
                      ) : item.category == "Toy" ? (
                        <Image src={Toy} alt="" />
                      ) : (
                        <Image src="" alt="" />
                      )}
                      <h1>{item.name}</h1>
                      {item.category == "Home" ? (
                        <Tag color="magenta">{item.category}</Tag>
                      ) : item.category == "Makeup" ? (
                        <Tag color="orange">{item.category}</Tag>
                      ) : item.category == "Shoes" ? (
                        <Tag color="green">{item.category}</Tag>
                      ) : item.category == "Clothes" ? (
                        <Tag color="cyan">{item.category}</Tag>
                      ) : item.category == "Toy" ? (
                        <Tag color="purple">{item.category}</Tag>
                      ) : null}
                      <p>{item.description}</p>
                      <h4>{item.price}</h4>
                      <h4>{item.stock}</h4>
                      <div className="container-buttons">
                        <Popconfirm
                          title="Are you sure to delete this task?"
                          onConfirm={(e) => confirmDelete(item.id)}
                          onCancel={cancelDelete}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="primary">Delete</Button>
                        </Popconfirm>
                        <CreateProduct product={item} />
                      </div>
                    </Card>
                  </Col>
                </List.Item>
              )}
            />
          </Row>
        </div>
      )}
    </>
  );
};
