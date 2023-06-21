import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import "../css/Book.css";

const { Meta } = Card;

export function Book(props) {
  return (
    <Link
      to={{
        pathname: `/home/books/detail/${props.id}`,
      }}
    >
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="" src={require("../images/book/" + props.bookSrc)} />}
      >
        <Meta title={props.bookName} description={"￥" + props.price} />
      </Card>
    </Link>
  );
}
