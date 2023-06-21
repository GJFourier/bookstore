import { apiURL } from "../constant";
import { message } from "antd";

export async function login(username, password) {
  return await fetch(apiURL + "/user/checkUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

export async function register(username, password, email) {
  console.log(username);
  console.log(password);
  console.log(email);
  return await fetch(
    apiURL +
      "/user/register?" +
      "username=" +
      username.toString() +
      "&password=" +
      password.toString() +
      "&email=" +
      email.toString(),
    {
      method: "POST",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

export async function getAllUser() {
  return await fetch(apiURL + "/user/getAll", { method: "GET" })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

export async function changeStatus(userId, status) {
  return await fetch(
    apiURL +
      "/user/changeStatus?" +
      "userId=" +
      userId.toString() +
      "&status=" +
      status.toString(),
    { method: "POST" }
  ).catch((err) => {
    console.log(err);
  });
}

export async function saveProfileData(data) {
  fetch(apiURL + "/user/saveProfileData", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        message.info("保存成功!");
      } else {
        message.error("保存失败!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
