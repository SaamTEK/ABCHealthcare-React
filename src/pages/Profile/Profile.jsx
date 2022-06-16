import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function ViewMedicine() {
  let { id } = useParams();

  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="d-flex">
        <div className="flex-column">
          <p>
            <Link to="/" style={{ textDecoration: "none" }}>
              Home{" "}
            </Link>
            &gt;{" "}
            <Link to="/profile" style={{ textDecoration: "none" }}>
              Profile
            </Link>{" "}
          </p>
        </div>
      </div>
      {!user ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <>
          <div className="d-flex mb-2">
            <Button size="sm" variant="outline-primary" className="me-1">
              <Link
                to="/profile/edit"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Edit Profile
              </Link>
            </Button>
            <Button size="sm" variant="outline-secondary" className="mx-1">
              <Link
                to="/profile/orders"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                My Orders
              </Link>
            </Button>
          </div>
          <div className="d-flex mt-3 flex-column-reverse flex-md-row">
            <div className="col-md-6">
              <p className="text-muted">User ID: {user.Id}</p>
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
        </>
      )}
    </div>
  );
}
