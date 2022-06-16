import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button, Card } from "react-bootstrap";

export default function CartList({ cart, onDelete }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center p-3"
      style={{ border: "1px solid black", width: "80%" }}
    >
      <p className="mx-3 mb-0">
        <b>{cart.product.Name}</b>
      </p>
      <p className="mx-3 mb-0">
        <b>{cart.product.Category.Name}</b>
      </p>
      <p className="mx-3 mb-0">
        <b>{cart.product.Price}</b>
      </p>
      <p className="mx-3 mb-0">
        <b>{cart.productQuantity}</b>
      </p>
      <p className="mx-3 mb-0">
        <b>{cart.product.Seller}</b>
      </p>
      <Button
        size="sm"
        variant="danger"
        className="mx-1"
        onClick={(e) => onDelete(e, cart.product.Id)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </Button>
    </div>
  );
}
