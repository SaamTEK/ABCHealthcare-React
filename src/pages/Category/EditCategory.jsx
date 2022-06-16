import { faCircleCheck, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function EditCategory() {
  let navigate = useNavigate();
  let { id } = useParams();

  const { user } = useContext(UserContext);

  let InitialValues = {
    Name: "",
  };

  const [category, setCategory] = useState(InitialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`categories/${id}`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log(category);
    axios
      .put(`categories/${id}`, category)
      .then((res) => {
        navigate(`/category`, { replace: true });
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
            <Link to={`/category`} style={{ textDecoration: "none" }}>
              Categories
            </Link>{" "}
            &gt; Edit Category
          </p>
        </div>
      </div>
      <Form noValidate className="my-3 w-50">
        {/* {loading ? (
          <div className="my-5">
            <Spinner animation="grow" />
          </div>
        ) : ( */}
        {/* )} */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            required
            name="Name"
            value={category.Name}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter category name"
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
            to={`/category`}
          >
            Go back
          </Link>
        </Button>
      </div>
    </div>
  );
}
