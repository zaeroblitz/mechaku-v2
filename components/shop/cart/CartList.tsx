import React from "react";
import CartItem, { CartItemProps } from "./CartItem";

interface Props {
  cartItems: CartItemProps[];
}

export default function CartList({ cartItems }: Props) {
  return (
    <div className="flex flex-col">
      {cartItems.map((item) => (
        <div></div>
      ))}
    </div>
  );
}
