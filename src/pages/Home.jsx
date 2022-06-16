import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Alert, Button, Form, InputGroup, Spinner } from "react-bootstrap";

import { UserContext } from "../context/UserContext";

import ProductCard from "../components/ProductCard";

export default function Home() {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [categories, setCategories] = useState();
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(true);

  const [categoryFilter, setCategoryFilter] = useState();

  useEffect(() => {
    const productsReq = axios.get("medicines");
    const categoriesReq = axios.get("categories");

    axios
      .all([productsReq, categoriesReq])
      .then(
        axios.spread((...res) => {
          let availableProducts = res[0].data.filter(
            (item) => item.Availability !== false
          );
          setProducts(availableProducts);
          setFilteredProducts(availableProducts);
          setCategories(res[1].data);
          setLoading(false);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCategoryFilter(value);
  };

  useEffect(() => {
    if (searchString !== "" && searchString.length > 0) {
      if (filteredProducts && filteredProducts.length > 0) {
        const prodArr = Array.from(filteredProducts);
        const filteredProductsArr = prodArr.filter((item) =>
          item.Name.toLowerCase().includes(searchString.toLowerCase())
        );
        setProducts(filteredProductsArr);
      }
    } else {
      axios
        .get("medicines")
        .then((res) =>
          setProducts(res.data.filter((item) => item.Availability !== false))
        )
        .catch((err) => console.log(err));
    }
  }, [searchString]);

  useEffect(() => {
    if (categoryFilter == 0) {
      axios
        .get("medicines")
        .then((res) => {
          setProducts(res.data.filter((item) => item.Availability !== false));
        })
        .catch((err) => console.log(err));
    }
    if (filteredProducts && filteredProducts.length > 0) {
      const prodArr = Array.from(filteredProducts);
      const filteredProductsArr = prodArr.filter(
        (item) => item.Category.Id == categoryFilter
      );
      setProducts(filteredProductsArr);
    }
  }, [categoryFilter]);

  console.log(products);

  return (
    <div className="container my-2">
      <Alert variant="primary">
        Welcome to ABC Healthcare: The one stop shop for all medical needs!
      </Alert>
      <h4>Available Products</h4>
      <div className="d-flex flex-row justify-content-end">
        <div className="w-1 me-1">
          <Form.Select onChange={(e) => handleInputChange(e)}>
            <option value={0}>Filter by Category</option>
            {categories &&
              categories.map((item, idx) => (
                <option key={idx} value={item.Id}>
                  {item.Name}
                </option>
              ))}
          </Form.Select>
        </div>
        <div className="w-25 ms-1">
          <InputGroup className="mb-3" variant="sm">
            <Form.Control
              placeholder="Search Medicine by Name"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      {!products ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : products.length > 0 ? (
        <div className="d-flex flex-row flex-wrap justify-content-center">
          {products.map((item, idx) => (
            <ProductCard key={idx} data={item} />
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <p>No products available.</p>
        </div>
      )}
    </div>
  );
}
