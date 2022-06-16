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
import { UserDataFields, UserDataTableColumns } from "../../data/UserData";

export default function ListMedicines() {
  const [loading, setLoading] = useState(true);

  const { users, setUsers } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("users")
      .then((res) => {
        setUsers(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="d-flex">
        <div className="flex-column">
          <p>
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>{" "}
            &gt; Users
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <Button size="sm" variant="outline-primary">
          <Link
            to="/user/add"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Add New User
          </Link>
        </Button>
      </div>
      {loading ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <DataTable
          tableColumns={UserDataTableColumns}
          data={users}
          dataFields={UserDataFields}
          type="user"
        />
      )}
    </div>
  );
}
