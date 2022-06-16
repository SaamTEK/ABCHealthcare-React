import { faCircleCheck, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function MyOrders() {
  let navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

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
    </div>
  );
}
