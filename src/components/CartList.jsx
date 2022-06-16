import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";

export default function CartList({ cart, onDelete }) {
  return (
    <ListGroup as="ol" numbered style={{ width: "70%" }}>
      {cart && cart.length > 0
        ? cart.map((item, idx) => (
            <ListGroup.Item
              key={idx}
              as="li"
              className="d-flex justify-content-between align-items-center"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.product.Name}</div>
                <span className="text-muted">Sold By:</span>{" "}
                {item.product.Seller}
                <br />
                <span className="text-muted">Category:</span>{" "}
                {item.product.Category.Name}
              </div>
              <div className="d-flex flex-column">
                <Badge bg="secondary" className="my-1">
                  Price: {item.product.Price}
                </Badge>
                <Badge bg="secondary" className="my-1">
                  Quantity: {item.productQuantity}
                </Badge>
              </div>
              <Button
                size="md"
                variant="danger"
                className="mx-2"
                onClick={(e) => onDelete(e, item.product.Id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </ListGroup.Item>
          ))
        : "no items"}
    </ListGroup>
  );
}
