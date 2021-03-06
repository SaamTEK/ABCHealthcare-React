import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function ViewMedicine() {
  let { id } = useParams();

  let navigate = useNavigate();

  const { cart, setCart, user } = useContext(UserContext);
  const [product, setProduct] = useState();
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`medicines/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = () => {
    const productCart = { product, productQuantity };
    const cartArray = cart.concat(productCart);
    setCart(cartArray);
    navigate("/");
    alert("Added item to cart!");
  };

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
            {user && user.Roles === "Admin" && (
              <Link to="/medicine" style={{ textDecoration: "none" }}>
                &gt; Products{" "}
              </Link>
            )}
            &gt; Product Details
          </p>
        </div>
      </div>
      {!product ? (
        <div className="my-5">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="d-flex mt-3 flex-column-reverse flex-md-row">
          <div className="col-md-6">
            <p className="text-muted">Product ID: {id}</p>
            <h4>
              <b>{product.Name}</b>
            </h4>
            <p>
              by: <b>{product.Seller}</b>
            </p>
            <p>Product Description: {product.Description}</p>
            <p>Category: {product.Category.Name}</p>
            <h4>
              Price: <b>???{product.Price}</b>
            </h4>
            <div className="mt-5 d-flex flex-row align-items-center">
              <p className="me-2 mb-1">Enter Quantity:</p>
              <input
                onChange={(e) => setProductQuantity(e.target.value)}
                value={productQuantity}
                type="number"
              />
              <Button className="ms-2" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
            <p>Product Image</p>
            <img
              src={
                product.Image
                  ? "https://abchealthcaresaamtek.azurewebsites.net" +
                    product.Image
                  : "https://www.netmeds.com/images/product-v1/150x150/812809/pure_nutrition_progut_plus_for_healthy_digestion_veg_capsules_60_s_0.jpg"
              }
              width="50%"
              height="auto"
              alt="product_image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
