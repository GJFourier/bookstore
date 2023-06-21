import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import logo from "../images/icon/logo.jpg";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { register } from "../services/UserService";
import { isValidEmail } from "../utils/toolFunctions";

export const RegisterView = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    if (values.password !== values.configurePassword) {
      message.error("两次密码不一致！");
      return;
    }
    if (!isValidEmail(values.email)) {
      message.error("邮箱地址非法！");
      return;
    }
    if (!(await register(values.username, values.password, values.email))) {
      message.error("该用户已存在！");
    } else {
      message.info("注册成功！");
      navigate("/login");
    }
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
                submitText: "注册",
              },
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
              }}
              placeholder={"用户名:"}
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            />
            <ProFormText
              name="email"
              fieldProps={{
                size: "large",
              }}
              placeholder={"邮箱:"}
              rules={[
                {
                  required: true,
                  message: "请输入邮箱",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
              }}
              placeholder={"密码:"}
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
            />
            <ProFormText.Password
              name="configurePassword"
              fieldProps={{
                size: "large",
              }}
              placeholder={"确认密码:"}
              rules={[
                {
                  required: true,
                  message: "请确认密码",
                },
              ]}
            />
          </LoginForm>
        </div>
      </ProConfigProvider>
    </div>
  );
};
