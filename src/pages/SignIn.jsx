import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

export default function SignIn() {
  let navigate = useNavigate();

  const InitialValues = {
    Username: "",
    Password: "",
  };

  const [userDetails, setUserDetails] = useState(InitialValues);
  const [validated, setValidated] = useState(false);

  const { user, setUser } = useContext(UserContext);

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
        .post("users/login", null, { params: userDetails })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data.user);
            localStorage.setItem("token", res.data.token);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => alert(err));
    } else {
      e.stopPropagating();
    }
  };

  return (
    <div>
      <h3>Welcome Back!</h3>
      <p>Please sign-in</p>
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
        <Button variant="primary" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
