import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Space } from "antd";
import cookie from "react-cookies";
import { saveProfileData } from "../services/UserService";
import { isValidEmail } from "../utils/toolFunctions";

const { TextArea } = Input;

export function ProfileView() {
  const user = cookie.load("currentUser");
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [signature, setSignature] = useState(user.signature);

  function handleClick() {
    if (!isValidEmail(email)) {
      message.error("邮箱地址非法！");
      return;
    }
    const data = {
      id: user.id,
      username: username,
      email: email,
      signature: signature,
    };
    if (saveProfileData(data)) {
      user.username = username;
      user.email = email;
      user.signature = signature;
      cookie.save("currentUser", user);
    }
  }

  return (
    <Space className={"board"} direction="vertical">
      <h1>个人信息</h1>
      <h2>用户名</h2>
      <Space>
        <Input
          placeholder="用户名"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Space>
      <h2>邮箱</h2>
      <Input
        placeholder="@xxx"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Space className={"board"}>
        <Space className={"avatar"} direction="vertical">
          <h2>头像</h2>
          <img alt="" src={require("../images/user/个人头像.jpg")} />
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
        </Space>
        <Space className={"board"} direction="vertical">
          <h2>个性签名</h2>
          <TextArea
            size="large"
            rows={9}
            value={signature}
            onChange={(e) => {
              setSignature(e.target.value);
            }}
          />
          <Space
            className={"board"}
            style={{ width: "100%", margin: "auto", justifyContent: "center" }}
          >
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={handleClick}
            >
              保存
            </Button>
          </Space>
        </Space>
      </Space>
    </Space>
  );
}
