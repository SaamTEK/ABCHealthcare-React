import React, { useContext, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import _ from "lodash";
import FlattenObject from "../util/FlattenObject";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function DataTable({
  data,
  tableColumns,
  dataFields,
  getter,
  setter,
  details = true,
  type = "products",
}) {
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`${type}s/${deleteId}`)
      .then((res) => {
        const list = getter.filter((p) => p.Id !== res.data.Id);
        setter(list);
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Table striped bordered hover responsive>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <thead>
        <tr>
          {tableColumns.map((i, idx) => (
            <th>{i}</th>
          ))}
          <th style={{ textAlign: "right" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((i, idx) => {
          let dataFieldSubset = _.pick(FlattenObject(i), dataFields);
          return (
            <tr>
              <td>{idx + 1}</td>
              {Object.keys(dataFieldSubset).map((k, i) => (
                <td>{String(dataFieldSubset[k])}</td>
              ))}
              <td style={{ textAlign: "right" }}>
                {details && (
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    className="mx-1"
                  >
                    <Link
                      style={{ color: "inherit", textDecoration: "none" }}
                      to={`/${type}/${i.Id}`}
                    >
                      Details
                    </Link>
                  </Button>
                )}
                <Button size="sm" variant="outline-secondary" className="mx-1">
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to={`/${type}/edit/${i.Id}`}
                  >
                    Edit
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  className="mx-1"
                  // onClick={(e) => handleDelete(e, i.Id)}
                  onClick={(e) => handleShow(i.Id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
