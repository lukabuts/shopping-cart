/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { myData } from "../Data/data";
import { useState, useEffect } from "react";
import "./cart.css";

export default function Cart({
  id,
  count,
  setAllItemsCount,
  allItemsCount,
  basket,
}) {
  const localStorageData =
    JSON.parse(localStorage.getItem("localstorageData")) || [];
  const item = localStorageData.find((item) => item.id === id);
  const [elementCount, setElementCount] = useState(item ? item.count : 0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem("allCount", JSON.stringify(allItemsCount));
  }, [allItemsCount]);

  function pushBasket(type) {
    let search = basket.find((x) => x.id === id);
    if (type === "plus") {
      search.count++;
    } else if (type === "minus") {
      search.count--;
    } else if (type === "zero") {
      search.count = 0;
    }

    localStorage.setItem("localstorageData", JSON.stringify(basket));
  }

  useEffect(() => {
    let calculatedTotalPrice = 0;

    basket.forEach((a) => {
      const id = a.id;
      if (a.count > 0) {
        const data = myData.find((x) => x.id === id);
        if (data) {
          calculatedTotalPrice += data.price * a.count;
        }
      }
    });

    setTotalPrice(calculatedTotalPrice);
  }, [basket, myData]);

  return (
    <>
      <div className="total">
        <p>Total Price: {totalPrice}</p>
      </div>
      <div className="item">
        {myData.map((item) => {
          if (item.id === id) {
            return (
              <>
                <div
                  className="x-icon"
                  onClick={() => {
                    setAllItemsCount(allItemsCount - elementCount);
                    setElementCount(0);
                    pushBasket("zero");
                  }}
                >
                  <i className="bi bi-x-lg"></i>
                </div>
                <div className="img-div">
                  <img src={item.img} alt="" />
                </div>
                <div className="details">
                  <div className="name-price">
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </div>
                  <div className="quantity-buttons">
                    <button
                      className="minus-btn"
                      onClick={() => {
                        if (elementCount === 0) return;
                        setAllItemsCount(allItemsCount - 1);
                        setElementCount(elementCount - 1);
                        pushBasket("minus");
                      }}
                    >
                      -
                    </button>
                    {count}
                    <button
                      className="plus-btn"
                      onClick={() => {
                        setAllItemsCount(allItemsCount + 1);
                        setElementCount(elementCount + 1);
                        pushBasket("plus");
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="total-price">
                    <h4>{item.price * count}</h4>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
    </>
  );
}
