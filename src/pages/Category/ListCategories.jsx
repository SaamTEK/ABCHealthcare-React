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
import {
  CategoryDataFields,
  CategoryDataTableColumns,
} from "../../data/CategoryData";

export default function ListCategories() {
  const [loading, setLoading] = useState(true);

  const { user, categories, setCategories } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("categories")
      .then((res) => {
        setCategories(res.data.reverse());
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
            &gt; Categories
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <Button size="sm" variant="outline-primary">
          <Link
            to="/category/add"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Add New Category
          </Link>
        </Button>
      </div>
      {loading ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <DataTable
          tableColumns={CategoryDataTableColumns}
          data={categories}
          dataFields={CategoryDataFields}
          type="categorie"
          details={false}
          getter={categories}
          setter={setCategories}
        />
      )}
    </div>
  );
}
