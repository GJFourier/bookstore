import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomeView } from "../views/HomeView";
import { BooksView } from "../views/BooksView";
import { BooksDetailView } from "../views/BooksDetailView";
import { CartView } from "../views/CartView";
import { OrdersView } from "../views/OrdersView";
import { ProfileView } from "../views/ProfileView";
import { LoginView } from "../views/LoginView";
import { UsersView } from "../views/UsersView";
import { RegisterView } from "../views/RegisterView";
import { AddBookView } from "../views/AddBookView";
import { OrderManageMentView } from "../views/OrderManageMentView";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/home" element={<HomeView />}>
          <Route path="books" element={<BooksView />} />
          <Route path="books/detail/:id" element={<BooksDetailView />} />
          <Route path="cart" element={<CartView />} />
          <Route path="orders" element={<OrdersView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="users" element={<UsersView />} />
          <Route path="addBook" element={<AddBookView />} />
          <Route path="orderManagement" element={<OrderManageMentView />} />
          <Route path="/home" element={<Navigate to="books" />} />
        </Route>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </BrowserRouter>
  );
};
