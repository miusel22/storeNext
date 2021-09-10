import React from "react";
import { Card, Col, Row, List, Tag, Button, Modal,Spin } from "antd";
import { Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import Image from "next/image";
import * as Clothes from "./images/Clothes.png";
import Home from "./images/home.png";
import MakeUp from "./images/makeup.png";
import Shoes from "./images/shoes.png";
import Toy from "./images/toystore.png";
import { Header } from "./Header";
import { CreateProduct } from "./createProduct";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "../graphql/Mutation";

export const Products = ({ products, loading }: any) => {
  var title = "";
  const { confirm } = Modal;
  const [deleteProduct, { error }] = useMutation(DELETE_PRODUCT);

  function confirmDelete(e: any) {
    deleteProduct({ variables: { id: e } });
    setTimeout(() => {
      window.location.reload();
    }, 1000);

    message.success("Product deleted");
  }

  function cancelDelete() {
    message.error("has not been deleted");
  }

  return (
    <>
      <div className="body">
        <Header />
        <CreateProduct product={[(title = "Create Product")]} />

        {loading ? (
        <Spin tip="Loading..."/>
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
                        <div className="align-img">
                          {item.category == "Home" ? (
                            <Image width={180} height={180} src={Home} alt="" />
                          ) : item.category == "Makeup" ? (
                            <Image
                              width={180}
                              height={180}
                              src={MakeUp}
                              alt=""
                            />
                          ) : item.category == "Shoes" ? (
                            <Image
                              width={180}
                              height={180}
                              src={Shoes}
                              alt=""
                            />
                          ) : item.category == "Clothes" ? (
                            <Image
                              width={180}
                              height={180}
                              src={Clothes}
                              alt=""
                            />
                          ) : item.category == "Toy" ? (
                            <Image width={180} height={180} src={Toy} alt="" />
                          ) : null}
                        </div>
                        <hr />
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
                        <div className="product-info" style={{ marginTop: 5 }}>
                          <h4></h4>
                          <p>{item.description}</p>
                        </div>
                        <div className="product-info">
                          <h4>Stock: {' '}</h4>
                          <p style={{marginLeft:2}}>{item.stock}</p>
                        </div>
                        <div className="product-info">
                          <h4>Price: </h4>
                          <p style={{marginLeft:2}}>${item.price} USD</p>
                        </div>

                        <div className="container-buttons">
                          <Popconfirm
                            title="Are you sure to deleted this product?"
                            onConfirm={(e) => confirmDelete(item.id)}
                            onCancel={cancelDelete}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              style={{
                                background: "red",
                                borderColor: "red",
                                marginRight: 5,
                              }}
                              type="primary"
                            >
                              Deleted
                            </Button>
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
      </div>
    </>
  );
};
