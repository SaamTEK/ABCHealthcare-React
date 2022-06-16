import { faCircleCheck, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import OrderList from "../../components/OrderList";
import { UserContext } from "../../context/UserContext";

export default function MyOrders() {
  let navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [orders, setOrders] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("orders")
      .then((res) => {
        let myOrders = res.data.filter((item) => item.User.Id === user.Id);
        setOrders(myOrders);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    axios
      .put(`users/${user.Id}`, user)
      .then((res) => {
        navigate(`/profile`, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex">
        <div className="flex-column">
          <p>
            <Link to="/" style={{ textDecoration: "none" }}>
              Home{" "}
            </Link>
            &gt;
            <Link to={`/profile`} style={{ textDecoration: "none" }}>
              {" "}
              Profile
            </Link>{" "}
            &gt; My Orders
          </p>
        </div>
      </div>
      {orders && orders.length > 0 ? (
        <div>
          <h3>My Orders</h3>
          <br />
          <OrderList orders={orders} />
        </div>
      ) : (
        <p>You do not have any orders.</p>
      )}
    </div>
  );
}
