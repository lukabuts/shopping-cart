/* eslint-disable react/prop-types */
import Cart from "./Cart";
import { useState, useEffect } from "react";
import { myData } from "../Data/data";
import "./cart.css";

export default function CartPage({
  setAllItemsCount,
  allItemsCount,
  basket,
  setBasket,
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [popActive, setPopActive] = useState(false);

  useEffect(() => {
    let calculatedTotalPrice = 0;

    basket.forEach((a) => {
      const id = a.id;
      const { price } = myData.find((x) => x.id === id) || {};
      if (price) {
        calculatedTotalPrice += price * a.count;
      }
    });

    setTotalPrice(calculatedTotalPrice);
  }, [basket, allItemsCount]);

  useEffect(() => {
    localStorage.setItem("localstorageData", JSON.stringify(basket));
  }, [basket]);

  return (
    <div className="cart-container">
      {basket.length > 0 && (
        <>
          <div
            className={
              popActive ? "popup bg-warning active" : "popup bg-warning"
            }
          >
            Coming Soon...
          </div>
          <div className="total">
            <h3>Total Price: {totalPrice}</h3>
          </div>
          <div className="checkout-clear-btns">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setBasket([]);
                setAllItemsCount(0);
              }}
            >
              Clear Cart
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                setPopActive(true);
                setTimeout(() => {
                  setPopActive(false);
                }, 1500);
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
      {basket.length === 0 && <h1>No Items Here</h1>}
      {basket
        .filter((x) => x.count !== 0)
        .map((item) => (
          <Cart
            id={item.id}
            count={item.count}
            key={item.id}
            setAllItemsCount={setAllItemsCount}
            allItemsCount={allItemsCount}
            basket={basket}
            setBasket={setBasket}
            myData={myData}
          />
        ))}
    </div>
  );
}
