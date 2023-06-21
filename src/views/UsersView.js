import { useEffect, useState } from "react";
import { changeStatus, getAllUser } from "../services/UserService";
import { message, Table } from "antd";
import { Radio } from "antd";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export function UsersView() {
  const [allCustomer, setAllCustomer] = useState([]);
  useEffect(() => {
    getAllUser().then((res) => {
      setAllCustomer(res);
    });
  }, []);

  const onChange = (e, userId) => {
    changeStatus(userId, e.target.value).then(() => {
      message.info("操作成功");
    });

    let newAllCustomer = [];

    allCustomer.forEach((user) => {
      if (user.id === userId) {
        newAllCustomer.push({
          ...user,
          status: e.target.value,
        });
      } else {
        newAllCustomer.push(user);
      }
      setAllCustomer(newAllCustomer);
    });
  };

  const columns = [
    {
      title: "姓名",
      dataIndex: "username",
      key: "id",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "id",
    },
    {
      title: "状态",
      key: "id",
      render: (user) => (
        <>
          <RadioGroup
            value={user.status.toString()}
            onChange={(e) => {
              onChange(e, user.id);
            }}
          >
            <RadioButton value="0">注销</RadioButton>
            <RadioButton value="1">正常</RadioButton>
            <RadioButton value="2">封禁</RadioButton>
          </RadioGroup>
        </>
      ),
    },
  ];

  return (
    <>
      <h1>用户列表</h1>
      <Table
        columns={columns}
        dataSource={allCustomer}
        style={{ marginRight: "30px" }}
      ></Table>
    </>
  );
}
