import { Button, Card, List, message, DatePicker, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Searchbar } from "../components/Searchbar";
import { Order } from "../components/Order";
import { deleteOrder, getOrder } from "../services/OrderService";
import cookie from "react-cookies";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

export function OrdersView() {
  dayjs.extend(customParseFormat);
  const user = cookie.load("currentUser");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrder(user.id).then((res) => {
      setOrders(res);
      console.log(res);
    });
  }, [user.id]);

  const handleDelete = (orderId) => {
    deleteOrder(orderId);
    const newOrders = orders.filter((order) => order.id !== orderId);
    setOrders(newOrders);
    message.info("删除成功");
  };

  return (
    orders !== null && (
      <div>
        <h1>我的订单</h1>
        <Space direction="vertical" size={12}>
          {/*<RangePicker*/}
          {/*  defaultValue={[*/}
          {/*    dayjs("2019-09-03", dateFormat),*/}
          {/*    dayjs("2019-11-22", dateFormat),*/}
          {/*  ]}*/}
          {/*  disabled={[false, false]}*/}
          {/*/>*/}
          <DatePicker />
          <RangePicker />
        </Space>
        <Searchbar message="输入书本信息" />
        {orders.map((order) => {
          const orderTime = new Date(order.time);
          const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          };
          console.log();
          return (
            <>
              <Card
                hoverable
                style={{
                  marginTop: "20px",
                  backgroundColor: "rgba(0,0,0,0.04)",
                }}
              >
                <div style={{}}>
                  <h4 style={{ display: "inline-block" }}>
                    总价:{"￥" + order.price}
                  </h4>
                  <br />
                  <h4 style={{ display: "inline-block" }}>
                    购买时间:{orderTime.toLocaleString("zh-CN", options)}
                  </h4>
                  <Button
                    type="primary"
                    danger
                    style={{ display: "inline-block", marginLeft: "80%" }}
                    onClick={() => handleDelete(order.id)}
                  >
                    删除记录
                  </Button>
                </div>
                <List
                  itemLayout="vertical"
                  dataSource={order.orderItemSet}
                  // pagination={{pageSize:3}}
                  renderItem={(item) => {
                    return (
                      <List.Item>
                        <Order data={item} />
                      </List.Item>
                    );
                  }}
                />
              </Card>
            </>
          );
        })}
      </div>
    )
  );
}
