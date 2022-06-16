import { faCircleCheck, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditMedicine() {
  let navigate = useNavigate();
  let { id } = useParams();

  const InitialValues = {
    UserName: "",
    Password: "",
    Roles: "User",
    Email: "",
    Fullname: "",
    Address: "",
  };

  const [user, setUser] = useState(InitialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`users/${id}`)
      .then((res) => {
        setUser(res.data);
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
      .put(`users/${id}`, user)
      .then((res) => {
        navigate(`/user/${id}`, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex">
        <div className="flex-column">
          <p>
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>{" "}
            &gt;{" "}
            <Link to={`/user`} style={{ textDecoration: "none" }}>
              Users
            </Link>{" "}
            &gt;{" "}
            <Link to={`/user/${id}`} style={{ textDecoration: "none" }}>
              User
            </Link>{" "}
            &gt; Edit User
          </p>
        </div>
      </div>
      <Form className="w-50">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="UserName"
            placeholder="Enter username"
            value={user.UserName}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            placeholder="Password"
            value={user.Password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            placeholder="Email"
            value={user.Email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            type="text"
            name="Fullname"
            placeholder="Fullname"
            value={user.Fullname}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="Address"
            placeholder="Address"
            value={user.Address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
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
            to={`/user`}
          >
            Go back
          </Link>
        </Button>
      </Form>
    </div>
  );
}
