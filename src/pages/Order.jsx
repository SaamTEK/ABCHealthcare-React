import React, { useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";

export default function Order() {
  const navigate = useNavigate();

  const { cart, setCart, user } = useContext(UserContext);

  console.log(cart);

  useEffect(() => {
    if (!cart || cart.length === 0) navigate("/");
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    if (user && cart && cart.length > 0) {
      cart.forEach((i) => {
        let orderProduct = {};
        orderProduct.Qty = i.productQuantity;
        orderProduct.UserId = user.Id;
        orderProduct.MedicineId = i.product.Id;
        placeOrder(orderProduct);
      });
      setCart([]);
      alert("Order Placed!");
      navigate("/");
    }
  };

  const placeOrder = (item) => {
    axios
      .post(`orders`, item)
      .then((res) => {
        console.log("Order Placed");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex">
        <div className="flex-column">
          <p>
            {user && user.Roles === "Admin" ? (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                Admin{" "}
              </Link>
            ) : (
              <Link to="/" style={{ textDecoration: "none" }}>
                Home{" "}
              </Link>
            )}
            &gt;{" "}
            <Link to="/cart" style={{ textDecoration: "none" }}>
              Cart{" "}
            </Link>
            &gt; Place Order
          </p>
        </div>
      </div>
      <h4>Place Order</h4>
      {user ? (
        <div className="d-flex mt-3 flex-column-reverse flex-md-row">
          <div className="col-md-6">
            <p>Name: {user.Fullname}</p>
            <p>Email: {user.Email}</p>
            <p>Address: {user.Address}</p>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
      <Form noValidate className="my-3 w-50">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Debit/Credit Card Number</Form.Label>
          <Form.Control
            required
            name="Name"
            type="text"
            placeholder="Enter Debit/Credit Card Number"
          />
        </Form.Group>
        <Button
          className="me-2"
          size="md"
          variant="outline-success"
          onClick={(e) => handleSave(e)}
        >
          Place Order
        </Button>
        <Button
          className="me-2"
          size="md"
          variant="outline-secondary"
          onClick={(e) => navigate("/cart")}
        >
          Go Back
        </Button>
      </Form>
    </div>
  );
}
