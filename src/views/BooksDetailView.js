import React, { useEffect, useState } from "react";
import { Button, Col, Image, Input, InputNumber, message, Row } from "antd";
import { Link, useParams } from "react-router-dom";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import "../css/BookDetail.css";
import { addCart } from "../services/CartService";
import { addBook, getBookById } from "../services/BookService";
import cookie from "react-cookies";

export function BooksDetailView() {
  const user = cookie.load("currentUser");
  const book = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    getBookById(book.id).then((res) => {
      setData(res);
    });
  }, [book.id]);

  // const data = books.find((item) => item.id.toString() === book.id);
  function save() {
    const book = {
      title: data.title,
      author: data.author,
      publisher: data.publisher,
      isbn: data.isbn,
      price: data.price,
      inventory: data.inventory,
      description: data.description,
      image: data.image,
    };
    addBook(book);
    message.info("修改成功");
  }

  function cancel() {
    getBookById(book.id).then((res) => {
      setData(res);
    });
  }

  if (user.role === 0)
    return (
      <div className={"content"}>
        <Link to={"/home/books"}>
          <Button icon={React.createElement(SearchOutlined)} type={"primary"}>
            回退
          </Button>
        </Link>
        <h2>{data.title}</h2>
        <div className="book_details">
          <div className="book_img">
            {data.image && (
              <Image
                className={"book-image"}
                alt=""
                src={require("../images/book/" + data.image)}
              />
            )}
          </div>
          <div className="detail_group">
            <table className={"descriptions"} border="1">
              <tbody>
                <tr className={"book_detail"}>
                  <td>书名</td>
                  <td>{data.title}</td>
                </tr>
                <tr className={"book_detail"}>
                  <td>作者</td>
                  <td>{data.author}</td>
                </tr>
                <tr className={"book_detail"}>
                  <td>出版社</td>
                  <td>{data.publisher}</td>
                </tr>
                <tr className={"book_isbn"}>
                  <td>ISBN</td>
                  <td>{data.isbn}</td>
                </tr>
                <tr className={"book_detail"}>
                  <td>价格</td>
                  <td className={"price"}>{"￥" + data.price}</td>
                </tr>
                <tr>
                  <td>库存</td>
                  <td>{data.inventory}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={"book_detail_description"}>
          <table border="1">
            <tr>
              <td>简介</td>
              <td style={{ textAlign: "left" }}>{data.description}</td>
            </tr>
          </table>
        </div>

        <div className={"button-groups"}>
          <Button
            type={"primary"}
            style={{ marginRight: "10px" }}
            onClick={() => {
              if (data.inventory === 0) message.error("该书本已无库存！");
              else addCart(data.id, user.id, 1);
            }}
          >
            加入购物车
          </Button>
        </div>
      </div>
    );
  else
    return (
      <div className={"content"}>
        <Link to={"/home/books"}>
          <Button icon={React.createElement(SearchOutlined)} type={"primary"}>
            回退
          </Button>
        </Link>
        <h2>{data.title}</h2>
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
          <Button
            type={"primary"}
            style={{ marginRight: "10px" }}
            onClick={save}
          >
            保存
          </Button>
          <Button
            danger
            type={"primary"}
            style={{ marginRight: "10px" }}
            onClick={cancel}
          >
            取消修改
          </Button>
        </div>
      </div>
    );
}
