import { faCircleCheck, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function AddMedicine() {
  let navigate = useNavigate();

  let InitialValues = {
    Name: "",
    Description: "",
    Price: "",
    Image: "",
    Seller: "",
    Availability: true,
    CategoryId: undefined,
  };

  const [categories, setCategories] = useState();
  const [product, setProduct] = useState(InitialValues);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  //   const [validated, setValidated] = useState(false);

  useEffect(() => {
    axios
      .get("categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileSelect = (e) => {
    setProduct({
      ...product,
      Image: e.target.files[0],
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    axios
      .post(`medicines`, product)
      .then((res) => {
        navigate(`/medicine/${res.data.Id}`, { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const handleImageUpload = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("ImageFile", product.Image);

    axios
      .post(`Medicines/Upload`, data)
      .then((res) => {
        if (res.data !== null) {
          setProduct({ ...product, Image: res.data });
          setUploaded(true);
          alert("Uploaded");
        }
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
            <Link to={`/medicine`} style={{ textDecoration: "none" }}>
              Products
            </Link>{" "}
            &gt; Add New Product
          </p>
        </div>
      </div>
      <Form
        noValidate
        className="my-3 w-50"
        // validated={validated}
        // onSubmit={handleSave}
      >
        {/* {loading ? (
          <div className="my-5">
            <Spinner animation="grow" />
          </div>
        ) : ( */}
        {/* )} */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            required
            name="Name"
            value={product.Name}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter product name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Category </Form.Label>
          {categories && (
            <Form.Select
              name="CategoryId"
              value={product.CategoryId}
              onChange={handleInputChange}
            >
              <option value={null}>Select product category</option>
              {categories.map((c, idx) => (
                <option value={c.Id} key={idx}>
                  {c.Name}
                </option>
              ))}
            </Form.Select>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            name="Description"
            value={product.Description}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter Product Description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Seller</Form.Label>
          <Form.Control
            required
            name="Seller"
            value={product.Seller}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter Seller Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price (in ₹)</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter Price (in ₹)"
            name="Price"
            value={product.Price}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
      <Form
        className="w-100"
        onSubmit={handleImageUpload}
        encType="multipart/form-data"
      >
        <div className="d-flex flex-row">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              required
              type="file"
              name="Image"
              // value={product.image}
              onChange={handleFileSelect}
            />
          </Form.Group>
          <div className="mt-2">
            <Button
              className="ms-2 my-4 mb-2"
              size="sm"
              variant="outline-success"
              type="submit"
              // onClick={(e) => handleImageUpload(e)}
            >
              {!uploaded ? (
                <>
                  Upload&ensp;
                  <FontAwesomeIcon icon={faUpload} />
                </>
              ) : (
                <>
                  Uploaded&ensp;
                  <FontAwesomeIcon icon={faCircleCheck} />
                </>
              )}
            </Button>
          </div>
        </div>
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
            to={`/medicine`}
          >
            Go back
          </Link>
        </Button>
      </div>
    </div>
  );
}
