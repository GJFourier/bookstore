import { Button, Card, DatePicker, Input, List, message, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Order } from "../components/Order";
import { deleteOrder, getOrder } from "../services/OrderService";
import cookie from "react-cookies";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import locale from "antd/es/date-picker/locale/zh_CN";

const { Search } = Input;
const { RangePicker } = DatePicker;
dayjs.extend(isBetween);
export function OrdersView() {
  dayjs.extend(customParseFormat);
  const user = cookie.load("currentUser");
  const [orders, setOrders] = useState([]);
  const [filteredOrdersByTime, setFilteredOrdersByTime] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [bookName, setBookName] = useState("");

  useEffect(() => {
    let newData = filteredOrdersByTime.filter((order) => {
      for (const orderItem of order.orderItemSet) {
        console.log(orderItem.book.title);
        if (orderItem.book.title.toLowerCase().includes(bookName.toLowerCase()))
          return true;
      }
      return false;
    });
    setFilteredOrders(newData);
  }, [bookName, filteredOrdersByTime]);
  useEffect(() => {
    getOrder(user.id).then((res) => {
      setOrders(res);
      setFilteredOrdersByTime(res);
      setFilteredOrders(res);
    });
  }, [user.id]);

  const handleDelete = (orderId) => {
    deleteOrder(orderId);
    const newOrders = orders.filter((order) => order.id !== orderId);
    setOrders(newOrders);
    message.info("删除成功");
  };
  const onFilter = (dates) => {
    if (dates && dates.length === 2) {
      const startDate = dates[0].startOf("day");
      const endDate = dates[1].endOf("day");

      const filtered = orders.filter((order) => {
        const time = new Date(order.time);
        const orderTime = dayjs(time);
        return orderTime.isBetween(startDate, endDate);
      });
      setFilteredOrdersByTime(filtered);
    } else {
      setFilteredOrdersByTime(orders);
    }
  };

  const onSearch = (str) => {
    setBookName(str);
  };
  return (
    orders !== null && (
      <div>
        <h1>我的订单</h1>
        <h2>按日期筛选</h2>
        <Space direction="vertical" size={12}>
          <RangePicker onChange={onFilter} locale={locale} />
        </Space>
        <Search
          placeholder="输入书本信息"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={(str) => onSearch(str)}
        />
        {filteredOrders.map((order) => {
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
