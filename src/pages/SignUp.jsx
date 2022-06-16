import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

export default function SignUp() {
  let navigate = useNavigate();

  const InitialValues = {
    Username: "",
    Password: "",
    Roles: "User",
    Email: "",
    Fullname: "",
    Address: "",
  };

  const [userDetails, setUserDetails] = useState(InitialValues);
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === true) {
      setValidated(true);
      axios
        .post("users", userDetails)
        .then((res) => {
          if (res.status === 201) {
            alert("Registered Successfully!");
            navigate("/login", { replace: true });
          } else {
            console.log("Something wrong happened!");
          }
        })
        .catch((err) => alert(err));
    } else {
      e.stopPropagating();
    }
  };

  return (
    <div>
      <h3>Register as a New User</h3>
      <p>Please enter details</p>
      <Form noValidate validated={validated} className="w-50">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            placeholder="Enter username"
            value={userDetails.Username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            placeholder="Password"
            value={userDetails.Password}
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
            value={userDetails.Email}
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
            value={userDetails.Fullname}
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
            value={userDetails.Address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
