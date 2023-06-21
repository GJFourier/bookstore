import { Button, Carousel, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { BookBar } from "../components/BookBar";
import { getBook } from "../services/BookService";
import cookie from "react-cookies";

const { Search } = Input;

export function BooksView() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  useEffect(() => {
    getBook().then((res) => {
      setData(res);
      setFilterData(res);
    });
  }, []);
  const user = cookie.load("currentUser");
  const carousel = (
    <Carousel autoplay>
      <div>
        <img src={require("../images/carousel/book1.jpg")} alt="" />
      </div>
      <div>
        <img src={require("../images/carousel/book2.jpg")} alt="" />
      </div>
      <div>
        <img src={require("../images/carousel/book3.jpg")} alt="" />
      </div>
      <div>
        <img src={require("../images/carousel/book4.jpg")} alt="" />
      </div>
    </Carousel>
  );

  const onSearch = (str) => {
    let newData = data.filter((book) =>
      book.title.toLowerCase().includes(str.toLowerCase())
    );
    setFilterData(newData);
  };
  return (
    <Col>
      <Row>
        <Col>
          <Search
            placeholder="输入书本信息"
            allowClear
            enterButton="搜索"
            size="large"
            onSearch={(str) => onSearch(str)}
          />
        </Col>
      </Row>
      <Row>
        <Col>{carousel}</Col>
      </Row>
      <Row>
        <Col>
          <BookBar
            deleteFlag={deleteFlag}
            data={filterData}
            del={(id) => {
              setFilterData(filterData.filter((item) => item.id !== id));
              setData(data.filter((item) => item.id !== id));
            }}
            itemNum="8"
          />
        </Col>
      </Row>
      {user.role === 1 && (
        <Row justify="center">
          <a href={"/home/addBook"}>
            <Button type={"primary"} style={{ marginRight: "10px" }}>
              新增书籍
            </Button>
          </a>
          {(!deleteFlag && (
            <Button
              type={"primary"}
              style={{ marginLeft: "10px" }}
              danger
              onClick={() => {
                setDeleteFlag(true);
              }}
            >
              删除书籍
            </Button>
          )) ||
            (deleteFlag && (
              <Button
                style={{ marginLeft: "10px" }}
                danger
                onClick={() => {
                  setDeleteFlag(false);
                }}
              >
                完成删除
              </Button>
            ))}
        </Row>
      )}
    </Col>
  );
}
