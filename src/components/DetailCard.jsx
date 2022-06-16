import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DetailCard({ title, count, path }) {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${path}`);
  };

  return (
    <Card
      bg="light"
      key="light"
      text={"dark"}
      style={{ width: "15rem" }}
      className="mb-2 mx-2"
    >
      <Card.Header style={{ textAlign: "right" }}>{title}</Card.Header>
      <Card.Body>
        <Card.Title style={{ textAlign: "right", fontSize: 72 }}>
          {count}
        </Card.Title>
        {/* <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text> */}
      </Card.Body>
      <Card.Footer style={{ textAlign: "right" }}>
        {/* <small className="text-muted">Last updated {dateString}</small> */}
        <Button size="sm" variant="outline-secondary" onClick={handleClick}>
          Manage
        </Button>
      </Card.Footer>
    </Card>
  );
}
