import {
  ReadOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../css/Home.css";
import { HeaderHome } from "../components/Header";
import cookie from "react-cookies";

const { Content, Sider } = Layout;
const itemCustomer_label = ["书本", "我的购物车", "我的订单", "个人信息"];
const itemAdmin_label = ["书本管理", "订单管理", "用户管理"];

const itemCustomer = [
  ReadOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  UserOutlined,
].map((icon, index) => {
  const key = ["Books", "Cart", "Orders", "Profile"];
  return {
    key: key[index],
    icon: React.createElement(icon),
    label: (
      <Link to={"/home/" + key[index].toLowerCase()}>
        {itemCustomer_label[index]}
      </Link>
    ),
  };
});

const itemAdmin = [ReadOutlined, SolutionOutlined, UserOutlined].map(
  (icon, index) => {
    const key = ["books", "orderManagement", "users"];
    return {
      key: key[index],
      icon: React.createElement(icon),
      label: <Link to={"/home/" + key[index]}>{itemAdmin_label[index]}</Link>,
    };
  }
);

export function HomeView() {
  const user = cookie.load("currentUser");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <HeaderHome></HeaderHome>
      <Layout className={"basicContent"}>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultOpenKeys={["Books"]}
            defaultSelectedKeys={["Books"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={user.role === 0 ? itemCustomer : itemAdmin}
          />
        </Sider>
        <Layout
          className={"layout"}
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            className={"content"}
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
