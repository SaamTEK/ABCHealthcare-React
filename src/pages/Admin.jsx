import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";

import DetailCard from "../components/DetailCard";

import { UserContext } from "../context/UserContext";
import {
  MedicineDataFields,
  MedicineDataTableColumns,
} from "../data/MedicineData";
import { OrderDataFields, OrderDataTableColumns } from "../data/OrderData";
import { UserDataFields, UserDataTableColumns } from "../data/UserData";

export default function Admin() {
  const { user } = useContext(UserContext);

  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersReq = axios.get("users");
    const productsReq = axios.get("medicines");
    const ordersReq = axios.get("orders");
    const categoriesReq = axios.get("categories");

    axios
      .all([usersReq, productsReq, ordersReq, categoriesReq])
      .then(
        axios.spread((...res) => {
          setUsers(res[0].data.reverse());
          setProducts(res[1].data.reverse());
          setOrders(res[2].data.reverse());
          setCategories(res[3].data);
          setLoading(false);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>Welcome, {user.Fullname}!</h3>
      <p>Details at a glance</p>
      {loading && !users && !products && !orders ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
          <DetailCard
            title="No. of Users"
            count={users.length}
            time={users.at(-1)}
            path="user"
          />
          <DetailCard
            title="No. of Categories"
            count={categories.length}
            time={categories.at(-1)}
            path="category"
          />
          <DetailCard
            title="No. of Listed Products"
            count={products.length}
            time={products.at(-1)}
            path="medicine"
          />
          <DetailCard
            title="No. of Orders"
            count={orders.length}
            time={orders.at(-1)}
            path="order"
          />
        </div>
      )}
      {loading && !products ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="my-5">
          <div className="d-flex justify-content-between mb-2">
            <h4>Listed Products:</h4>
            <Button size="sm" variant="outline-primary">
              <Link
                to="/medicine/add"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Add New Product
              </Link>
            </Button>
          </div>
          <DataTable
            tableColumns={MedicineDataTableColumns}
            data={products.slice(0, 5)}
            dataFields={MedicineDataFields}
            type="medicine"
            getter={products}
            setter={setProducts}
          />
        </div>
      )}
      {loading && !orders ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="my-5">
          <div className="d-flex justify-content-between mb-2">
            <h4>Recent Orders:</h4>
            <Button size="sm" variant="outline-primary">
              <Link
                to="/order/add"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Add New Order
              </Link>
            </Button>
          </div>
          <DataTable
            tableColumns={OrderDataTableColumns}
            data={orders.slice(0, 5)}
            dataFields={OrderDataFields}
            type="order"
            details={false}
            getter={orders}
            setter={setOrders}
          />
        </div>
      )}
      {loading && !users ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="my-5">
          <div className="d-flex justify-content-between mb-2">
            <h4>Registered Users:</h4>
            <Button size="sm" variant="outline-primary">
              <Link
                to="/user/add"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Add New User
              </Link>
            </Button>
          </div>
          <DataTable
            tableColumns={UserDataTableColumns}
            data={users.slice(0, 5)}
            dataFields={UserDataFields}
            type="user"
            getter={users}
            setter={setUsers}
          />
        </div>
      )}
    </div>
  );
}
