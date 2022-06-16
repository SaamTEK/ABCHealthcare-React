import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { UserContext } from "../../context/UserContext";
import { OrderDataFields, OrderDataTableColumns } from "../../data/OrderData";

export default function ListOrders() {
  const [loading, setLoading] = useState(true);

  const { user, orders, setOrders } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("orders")
      .then((res) => {
        setOrders(res.data.reverse());
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
            &gt; Orders
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <Button size="sm" variant="outline-primary">
          <Link
            to="/order/add"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Add New Order
          </Link>
        </Button>
      </div>
      {loading ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <DataTable
          tableColumns={OrderDataTableColumns}
          data={orders}
          dataFields={OrderDataFields}
          type="order"
          details={false}
          getter={orders}
          setter={setOrders}
        />
      )}
    </div>
  );
}
