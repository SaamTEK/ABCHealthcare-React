import { faCircleCheck, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function AddOrder() {
  let navigate = useNavigate();

  const { user } = useContext(UserContext);

  let InitialValues = {
    Qty: "",
    UserId: undefined,
    MedicineId: undefined,
  };

  const [order, setOrder] = useState(InitialValues);
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersReq = axios.get("users");
    const productsReq = axios.get("medicines");

    axios
      .all([usersReq, productsReq])
      .then(
        axios.spread((...res) => {
          setUsers(res[0].data.reverse());
          setProducts(res[1].data.reverse());
          setLoading(false);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    axios
      .post(`orders`, order)
      .then((res) => {
        navigate(`/order/`, { replace: true });
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
            <Link to={`/order`} style={{ textDecoration: "none" }}>
              Orders
            </Link>{" "}
            &gt; Add New Order
          </p>
        </div>
      </div>
      <Form noValidate className="my-3 w-50">
        <Form.Group className="mb-3">
          <Form.Label>Select User to place order on behalf of</Form.Label>
          {users && (
            <Form.Select
              name="UserId"
              value={order.UserId}
              onChange={handleInputChange}
            >
              <option value={null}>Select User</option>
              {users.map((c, idx) => (
                <option value={c.Id} key={idx}>
                  {c.Fullname}
                </option>
              ))}
            </Form.Select>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select Product</Form.Label>
          {users && (
            <Form.Select
              name="MedicineId"
              value={order.MedicineId}
              onChange={handleInputChange}
            >
              <option value={null}>Select Product</option>
              {products.map((c, idx) => (
                <option value={c.Id} key={idx}>
                  {c.Name}
                </option>
              ))}
            </Form.Select>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Order Quantity</Form.Label>
          <Form.Control
            required
            name="Qty"
            value={order.Qty}
            onChange={handleInputChange}
            type="number"
            placeholder="Enter Order Quantity"
          />
        </Form.Group>
      </Form>
      <div className="my-3">
        <Button
          className="me-2"
          size="sm"
          variant="outline-success"
          onClick={(e) => handleSave(e)}
        >
          Save Changes
        </Button>
        <Button className="me-2" size="sm" variant="outline-danger">
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/order`}
          >
            Go back
          </Link>
        </Button>
      </div>
    </div>
  );
}
