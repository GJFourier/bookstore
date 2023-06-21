import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import logo from "../images/icon/logo.jpg";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { login } from "../services/UserService";
import cookie from "react-cookies";

export const LoginView = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // if (values.username === "thunderboy" && values.password === "reins1409") {
    //   navigate("/home");
    // } else {
    //   console.log("fail");
    // }
    login(values.username, values.password).then((res) => {
      if (res === null || res === undefined) {
        message.error("用户名或密码错误");
      } else {
        if (res.status === 0) {
          message.error("该账户已注销");
        }
        if (res.status === 2) {
          message.error("该账户已被封禁");
        }
        if (res.status === 1) {
          cookie.save("currentUser", {
            id: res.id,
            username: res.username,
            signature: res.signature,
            email: res.email,
            avatar: res.avatar,
            role: res.role,
          });
          message.info("登录成功");
          navigate("/home/books");
        }
      }
    });
  };
  return (
    <div style={{ marginTop: "200px" }}>
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: "white" }}>
          <LoginForm
            logo={logo}
            title="BookStore"
            onFinish={handleSubmit}
            submitter={{
              searchConfig: {
                submitText: "登录",
              },
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"用户名:"}
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"密码:"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <a
                style={{
                  float: "right",
                }}
                href={"/register"}
              >
                点击注册
              </a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};
