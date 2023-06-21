import { apiURL } from "../constant";
import { message } from "antd";

export async function addCart(bookId, userId, count) {
  return await fetch(apiURL + "/cartItem/add", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bookId: bookId,
      userId: userId,
      count: count,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error:", error);
    })
    .then((flag) => {
      if (flag) {
        message.info("成功加入购物车！");
      } else {
        message.error("该书籍已加入购物车,请勿重复操作！");
      }
    });
}

export async function changeBookCount(userId, bookId, count) {
  console.log(userId);
  console.log(bookId);
  console.log(count);
  return await fetch(apiURL + "/cartItem/change", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      bookId: bookId,
      count: count,
    }),
  });
}

export async function deleteBook(bookId, userId) {
  return await fetch(
    apiURL + "/cartItem/delete?userId=" + userId + "&bookId=" + bookId,
    {
      method: "DELETE",
    }
  ).catch((error) => {
    console.log("Error:", error);
  });
}

export async function getCart(userId) {
  return await fetch(apiURL + "/cartItem/get/" + userId, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}
