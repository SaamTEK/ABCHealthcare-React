import React from "react";
import { Badge, ListGroup } from "react-bootstrap";

export default function OrderList({ orders }) {
  return (
    <ListGroup as="ol" numbered style={{ width: "70%" }}>
      {orders &&
        orders.length > 0 &&
        orders.map((item, idx) => (
          <ListGroup.Item
            key={idx}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.Medicine.Name}</div>
              Sold By: {item.Medicine.Seller}
            </div>
            <div className="d-flex flex-column">
              <Badge bg="secondary" className="my-1">
                Price: {item.Medicine.Price}
              </Badge>
              <Badge bg="secondary" className="my-1">
                Quantity: {item.Qty}
              </Badge>
            </div>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}
