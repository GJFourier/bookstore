import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Image, Input, InputNumber, message, Row } from "antd";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { addBook } from "../services/BookService";

export function AddBookView() {
  const book = {
    title: "",
    image: "Java核心技术卷二.jpg",
    author: "",
    isbn: "",
    publisher: "",
    price: "",
    description: "",
    inventory: "",
  };
  const navigate = useNavigate();

  function add() {
    if (
      data.image &&
      data.title &&
      data.isbn &&
      data.inventory &&
      data.author &&
      data.description &&
      data.price &&
      data.publisher
    ) {
      addBook(data);
      message.info("添加成功");
      navigate("/home");
    } else message.error("请填写完整信息！");
  }

  const [data, setData] = useState(book);
  return (
    <div className={"content"}>
      <Link to={"/home/books"}>
        <Button icon={React.createElement(SearchOutlined)} type={"primary"}>
          回退
        </Button>
      </Link>
      <h2>{data && data.title}</h2>
      <div className="book_details">
        <Col className="book_img">
          <Row justify={"center"}>
            {data.image && (
              <Image
                className={"book-image"}
                alt=""
                src={require("../images/book/" + data.image)}
              />
            )}
            <Button
              className={"upload"}
              type="primary"
              shape="round"
              icon={<UploadOutlined />}
              size="large"
              ghost="true"
            >
              上传图片
            </Button>
          </Row>
        </Col>
        <div className="detail_group">
          <table className={"descriptions"} border="1">
            <tbody>
              <tr className={"book_detail"}>
                <td>书名</td>
                <td>
                  <Input
                    value={data.title}
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        title: e.target.value,
                      }));
                    }}
                  ></Input>
                </td>
              </tr>
              <tr className={"book_detail"}>
                <td>作者</td>
                <td>
                  <Input
                    value={data.author}
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        author: e.target.value,
                      }));
                    }}
                  ></Input>
                </td>
              </tr>
              <tr className={"book_detail"}>
                <td>出版社</td>
                <td>
                  <Input
                    value={data.publisher}
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        publisher: e.target.value,
                      }));
                    }}
                  ></Input>
                </td>
              </tr>
              <tr className={"book_isbn"}>
                <td>ISBN</td>
                <td>
                  <Input
                    value={data.isbn}
                    onChange={(e) => {
                      setData((prevData) => ({
                        ...prevData,
                        isbn: e.target.value,
                      }));
                    }}
                  ></Input>
                </td>
              </tr>
              <tr className={"book_detail"}>
                <td>价格</td>
                <td className={"price"}>
                  <InputNumber
                    value={data.price}
                    onChange={(value) => {
                      setData((prevData) => ({
                        ...prevData,
                        price: value,
                      }));
                    }}
                    min={0}
                    style={{ width: "100%" }}
                  ></InputNumber>
                </td>
              </tr>
              <tr>
                <td>库存</td>
                <td>
                  <InputNumber
                    value={data.inventory}
                    onChange={(value) => {
                      value = Math.floor(value);
                      setData((prevData) => ({
                        ...prevData,
                        inventory: value,
                      }));
                    }}
                    min={0}
                    style={{ width: "100%" }}
                  ></InputNumber>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={"book_detail_description"}>
        <table border="1">
          <tr>
            <td>简介</td>
            <td
              style={{
                textAlign: "left",
                width: "500px",
                height: "200px",
              }}
            >
              <Input.TextArea
                value={data.description}
                onChange={(e) => {
                  setData((prevData) => ({
                    ...prevData,
                    description: e.target.value,
                  }));
                }}
                autoSize={{ minRows: 1, maxRows: 40 }}
                style={{
                  height: "200px",
                  overflow: "auto",
                }}
              ></Input.TextArea>
            </td>
          </tr>
        </table>
      </div>
      <div className={"button-groups"}>
        <Button type={"primary"} style={{ marginRight: "10px" }} onClick={add}>
          添加
        </Button>
      </div>
    </div>
  );
}
