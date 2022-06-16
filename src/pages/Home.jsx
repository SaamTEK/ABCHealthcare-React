import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Alert, Spinner } from "react-bootstrap";

import { UserContext } from "../context/UserContext";

import ProductCard from "../components/ProductCard";

export default function Home() {
  const [medicines, setMedicines] = useState();
  const [loading, setloading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("medicines")
      .then((res) => {
        setMedicines(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container my-2">
      <Alert variant="primary">
        Welcome to ABC Healthcare: The one stop shop for all medical needs!
      </Alert>
      <h4>Available Products</h4>
      {!medicines ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="d-flex flex-row flex-wrap justify-content-center">
          {medicines.map((item, idx) => (
            <ProductCard key={idx} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
