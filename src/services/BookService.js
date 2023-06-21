import { apiURL } from "../constant";

export async function getBook() {
  return await fetch(apiURL + "/book/all", {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function getBookById(id) {
  return await fetch(apiURL + "/book/" + id, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export async function addBook(book) {
  await fetch(apiURL + "/book/add", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: book.title,
      image: book.image,
      author: book.author,
      isbn: book.isbn,
      publisher: book.publisher,
      price: book.price,
      description: book.description,
      inventory: book.inventory,
    }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error:", error);
    });
}

export async function delBook(id) {
  console.log(id);
  await fetch(apiURL + "/book/del?id=" + id.toString(), {
    method: "DELETE",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error:", error);
    });
}
