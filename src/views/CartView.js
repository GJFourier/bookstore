import { Button, InputNumber, message, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Searchbar } from "../components/Searchbar";
import { changeBookCount, deleteBook, getCart } from "../services/CartService";
import { addOrder } from "../services/OrderService";
import cookie from "react-cookies";

const { Column } = Table;

export function CartView() {
  const user = cookie.load("currentUser");

  const [data, setData] = useState([]);
  useEffect(() => {
    getCart(user.id).then((res) => {
      setData(res);
    });
  }, [user.id]);

  return (
    <div>
      <h1>我的购物车</h1>
      <Searchbar message="输入书本信息" />
      <Table
        className={"cart_table"}
        dataSource={data}
        pagination={{ pageSize: 3 }}
      >
        <Column
          className={"cart_table"}
          title="封面"
          render={(record) => {
            return (
              <img
                className={"cart_image"}
                src={require("../images/book/" + record.book.image)}
                alt=""
              />
            );
          }}
        />
        <Column
          className={"cart_table"}
          title="书名"
          render={(record) => <Tag>{record.book.title}</Tag>}
        />
        <Column
          className={"cart_table"}
          title="数量"
          render={(record) => (
            <InputNumber
              min={1}
              max={record.book.inventory}
              defaultValue={record.count}
              onChange={(value) => {
                console.log(record);
                changeBookCount(record.user.id, record.book.id, value);
              }}
            />
          )}
        />
        <Column
          className={"cart_table"}
          title="单价"
          render={(record) => <Tag>{"￥" + record.book.price}</Tag>}
        />
        <Column
          className={"cart_table"}
          title="操作"
          render={(record) => (
            <Space size="middle">
              <Button
                type={"primary"}
                danger
                onClick={() => {
                  deleteBook(record.book.id, record.user.id);
                  setData(
                    data.filter(
                      (item) =>
                        item.book.id !== record.book.id &&
                        item.userId === record.userId
                    )
                  );
                  message.info("成功移除购物车");
                }}
              >
                移出购物车
              </Button>
            </Space>
          )}
        />
      </Table>
      <Button
        type={"primary"}
        style={{ marginLeft: "550px" }}
        onClick={() => {
          addOrder(user.id).then((flag) => {
            if (flag === true) alert("购买成功！");
            else alert("fail!");
          });
          setData([]);
        }}
      >
        立即购买
      </Button>
    </div>
  );
}
