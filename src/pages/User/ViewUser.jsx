import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function ViewMedicine() {
  let { id } = useParams();

  const { user: userCtx } = useContext(UserContext);

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

  return (
    <div>
      <div className="d-flex">
        <div className="flex-column">
          <p>
            {userCtx && userCtx.Roles === "Admin" ? (
              <Link to="/admin" style={{ textDecoration: "none" }}>
                Admin{" "}
              </Link>
            ) : (
              <Link to="/" style={{ textDecoration: "none" }}>
                Home{" "}
              </Link>
            )}
            &gt;{" "}
            <Link to="/user" style={{ textDecoration: "none" }}>
              Users
            </Link>{" "}
            &gt; User Details
          </p>
        </div>
      </div>
      {!user ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="d-flex mt-3 flex-column-reverse flex-md-row">
          <div className="col-md-6">
            <p className="text-muted">User ID: {id}</p>
            <h4>
              Name: <b>{user.Fullname}</b>
            </h4>
            <p>
              Username: <b>{user.UserName}</b>
            </p>
            <p>Email: {user.Email}</p>
            <p>Role: {user.Roles}</p>
            <p>Address: {user.Address}</p>
          </div>
        </div>
      )}
    </div>
  );
}
