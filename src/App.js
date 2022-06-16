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

function App() {
  let navigate = useNavigate();

  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
  }, []);

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
        }}
      >
        <NavbarComponent handleLogout={handleLogout} user={user} />
        <div className="container my-4">
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path="cart" element={<Cart />} />

            <Route path="medicine">
              <Route index element={<ListMedicines />} />
              <Route path=":id" element={<ViewMedicine />} />
              <Route path="add" element={<AddMedicine />} />
              <Route path="edit/:id" element={<EditMedicine />} />
            </Route>

            <Route path="user">
              <Route index element={<ListUsers />} />
              <Route path=":id" element={<ViewUser />} />
              <Route path="add" element={<AddUser />} />
              <Route path="edit/:id" element={<EditUser />} />
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
