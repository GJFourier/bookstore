import React from "react";
import { Button, Col, List, message, Row } from "antd";
import { Book } from "./Book";
import { delBook } from "../services/BookService";

export function BookBar(props) {
  let data = props.data;

  function handleDelete(id) {
    delBook(id);
    message.info("删除成功！");
  }

  return (
    <List
      grid={{
        gutter: 1,
        column: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Col>
            <Row justify={"center"}>
              <Book
                id={item.id}
                bookSrc={item.image}
                bookName={item.title}
                price={item.price}
              />
              {props.deleteFlag && (
                <Button
                  type={"primary"}
                  danger
                  onClick={() => {
                    handleDelete(item.id);
                    props.del(item.id);
                  }}
                  style={{ width: "60%" }}
                >
                  删除
                </Button>
              )}
            </Row>
          </Col>
        </List.Item>
      )}
      pagination={{ pageSize: props.itemNum }}
    />
  );
}
