import { apiURL } from "../constant";

export async function addOrder(userId) {
  return await fetch(apiURL + "/order/add/" + userId, {
    method: "POST",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error:", error);
    });
}

export async function getOrder(userId) {
  return await fetch(apiURL + "/order/get/" + userId, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error:", error);
    });
}

export async function deleteOrder(orderId) {
  await fetch(apiURL + "/order/delete/" + orderId, {
    method: "DELETE",
  }).catch((error) => {
    console.log("Error:", error);
  });
}
