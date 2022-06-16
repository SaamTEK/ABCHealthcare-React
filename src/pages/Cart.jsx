import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Cart() {
  const { cart, user } = useContext(UserContext);

  console.log(user);

  return <div>Cart</div>;
}
