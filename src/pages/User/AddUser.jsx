import { faCircleCheck, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function AddUser() {
  let navigate = useNavigate();

  const { user } = useContext(UserContext);

  const InitialValues = {
    UserName: "",
    Password: "",
    Roles: "",
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
            navigate("/admin", { replace: true });
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
            <Link to={`/user`} style={{ textDecoration: "none" }}>
              Users
            </Link>{" "}
            &gt; Add New User
          </p>
        </div>
      </div>
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
        <Form.Group className="mb-3">
          <Form.Label>Select User Type</Form.Label>
          <Form.Select
            name="Roles"
            value={userDetails.Roles}
            onChange={handleInputChange}
          >
            <option value={null}>Select User Type</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Form.Select>
        </Form.Group>
        <Button
          className="me-2"
          size="sm"
          variant="outline-success"
          onClick={(e) => handleSubmit(e)}
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
