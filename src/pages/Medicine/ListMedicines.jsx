import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { UserContext } from "../../context/UserContext";
import {
  MedicineDataFields,
  MedicineDataTableColumns,
} from "../../data/MedicineData";

export default function ListMedicines() {
  // const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const { products, setProducts, user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("medicines")
      .then((res) => {
        setProducts(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
            &gt; Products
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <Button size="sm" variant="outline-primary">
          <Link
            to="/medicine/add"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Add New Product
          </Link>
        </Button>
      </div>
      {loading ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <DataTable
          tableColumns={MedicineDataTableColumns}
          data={products}
          dataFields={MedicineDataFields}
          type="medicine"
        />
      )}
    </div>
  );
}
