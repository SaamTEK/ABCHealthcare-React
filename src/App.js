import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

import "./App.css";

import { UserContext } from "./context/UserContext";

import ProtectedRoute from "./routes/ProtectedRoute";

import NavbarComponent from "./components/NavbarComponent";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";

import ListMedicines from "./pages/Medicine/ListMedicines";
import AddMedicine from "./pages/Medicine/AddMedicine";
import ViewMedicine from "./pages/Medicine/ViewMedicine";
import EditMedicine from "./pages/Medicine/EditMedicine";

import AddUser from "./pages/User/AddUser";
import ViewUser from "./pages/User/ViewUser";
import ListUsers from "./pages/User/ListUsers";
import EditUser from "./pages/User/EditUser";

import ListCategories from "./pages/Category/ListCategories";
import AddCategory from "./pages/Category/AddCategory";
import EditCategory from "./pages/Category/EditCategory";

import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import MyOrders from "./pages/Profile/MyOrders";

import ListOrders from "./pages/Order/ListOrders";
import AddOrder from "./pages/Order/AddOrder";
import EditOrder from "./pages/Order/EditOrder";
import Order from "./pages/Order";

function App() {
  (function () {
    let token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
  })();

  let navigate = useNavigate();

  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState();
  const [users, setUsers] = useState();
  const [categories, setCategories] = useState();
  const [orders, setOrders] = useState();

  useEffect(() => {
    let token = localStorage.getItem("token");
    let UserId = localStorage.getItem("UserId");
    if (token && UserId) {
      axios
        .get(`users/${UserId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          user,
          setUser,
          cart,
          setCart,
          products,
          setProducts,
          users,
          setUsers,
          categories,
          setCategories,
          orders,
          setOrders,
        }}
      >
        <NavbarComponent handleLogout={handleLogout} user={user} />
        <div className="container my-4">
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path="cart" element={<Cart />} />
            <Route path="place-order" element={<Order />} />

            <Route path="category">
              <Route index element={<ListCategories />} />
              <Route path="add" element={<AddCategory />} />
              <Route path="edit/:id" element={<EditCategory />} />
            </Route>

            <Route path="medicine">
              <Route index element={<ListMedicines />} />
              <Route path=":id" element={<ViewMedicine />} />
              <Route path="add" element={<AddMedicine />} />
              <Route path="edit/:id" element={<EditMedicine />} />
            </Route>

            <Route path="order">
              <Route index element={<ListOrders />} />
              <Route path="add" element={<AddOrder />} />
              <Route path="edit/:id" element={<EditOrder />} />
            </Route>

            <Route path="user">
              <Route index element={<ListUsers />} />
              <Route path=":id" element={<ViewUser />} />
              <Route path="add" element={<AddUser />} />
              <Route path="edit/:id" element={<EditUser />} />
            </Route>

            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path="edit" element={<EditProfile />} />
              <Route path="orders" element={<MyOrders />} />
            </Route>

            <Route path="admin">
              <Route
                index
                element={
                  <ProtectedRoute
                    redirectPath="/"
                    isAllowed={!!user && user.Roles === "Admin"}
                  >
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
