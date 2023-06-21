import React, { useState } from "react";
import { Header } from "antd/es/layout/layout";
import { Button, Col, Dropdown, Menu, Modal, Row, Image } from "antd";
import logoFont from "../images/icon/logo-name.svg";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";

export function HeaderHome() {
  const user = cookie.load("currentUser");

  const navigate = useNavigate();

  const [modal1Visible, setModalVisible] = useState(false);

  const onOk = () => {
    setModalVisible(false);
    navigate("/login");
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
        >
          退出账户
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Modal
        title="退出"
        style={{ top: 20 }}
        visible={modal1Visible}
        okText={"确定"}
        cancelText={"取消"}
        onOk={onOk}
        onCancel={onCancel}
      >
        确定要退出吗？
      </Modal>

      <Header className="header" style={{ backgroundColor: "white" }}>
        <div id="header">
          <div id="header-content">
            <Row>
              <Col span={4} offset={3}>
                <a id="logo" href={"/home"}>
                  <img
                    alt="logo"
                    className="logo"
                    src={require("../images/icon/logo.jpg")}
                    style={{ height: 45 }}
                  />
                  <img
                    alt="Book Store"
                    className="logo-font"
                    src={logoFont}
                    style={{ height: 40 }}
                  />
                </a>
              </Col>
              <Col span={4} offset={12}>
                {user && (
                  <>
                    <div style={{ display: "flex" }}>
                      <Dropdown overlay={menu}>
                        <Image
                          style={{
                            width: "60px",
                            height: "60px",
                          }}
                          alt="avatar"
                          src={require("../images/user/" + user.avatar)}
                        ></Image>
                      </Dropdown>
                      <h4>你好,{user.username}！</h4>
                    </div>
                  </>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </Header>
    </>
  );
}
