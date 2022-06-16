import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button, Card } from "react-bootstrap";

import CartList from "../components/CartList";

export default function Cart() {
  let navigate = useNavigate();

  const { cart, setCart, user } = useContext(UserContext);

  const handleDelete = (e, id) => {
    const cartList = cart.filter((p) => p.product.Id !== id);
    // console.log(cartList);
    setCart(cartList);
  };

  const handlePlaceOrder = () => {
    if (user) {
      navigate("/place-order");
    } else {
      navigate("/login");
    }
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
            &gt; Cart
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h3>My Cart</h3>
        <br />
        {cart && cart.length > 0 && (
          <CartList cart={cart} onDelete={handleDelete} />
        )}
        {cart && cart.length > 0 && (
          <Button
            className="mt-3"
            size="lg"
            variant="success"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        )}
      </div>
    </div>
  );
}
