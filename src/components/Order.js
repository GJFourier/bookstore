import React from "react";
import { Image, Space } from "antd";

export function Order(props) {
  return (
    <Space className={"orderItem"}>
      <Image
        className={"order_image"}
        alt=""
        src={require("../images/book/" + props.data.book.image)}
      />
      <p className={"order_text"}>
        {"书名：" + props.data.book.title}
        <br />
        {"作者：" + props.data.book.author}
        <br />
        {"单价：" + props.data.book.price}
        <br />
        {"数量：" + props.data.count}
        <br />
      </p>
    </Space>
  );
}
