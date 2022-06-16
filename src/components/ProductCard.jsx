import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({ data }) {
  return (
    <Card
      className="col-6 col-md-4 col-lg-3 mx-0 mx-lg-1 my-1"
      style={{ maxWidth: "14em" }}
    >
      <Card.Body>
        <div className="text-start my-2">
          <Card.Img
            variant="top"
            src={
              data.Image
                ? "https://localhost:44337" + data.Image
                : "https://www.netmeds.com/images/product-v1/150x150/812809/pure_nutrition_progut_plus_for_healthy_digestion_veg_capsules_60_s_0.jpg"
            }
            height="125"
            width="50"
          />
          <Card.Title className="mt-2">{data.Name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {data.Category.Name}
          </Card.Subtitle>
          <Card.Text>{data.Description}</Card.Text>
        </div>
      </Card.Body>
      <Button variant="primary">
        <Link
          to={`/medicine/${data.Id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Details
        </Link>
      </Button>
    </Card>
  );
}
