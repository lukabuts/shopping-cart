/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Cart({
  id,
  count,
  setAllItemsCount,
  allItemsCount,
  basket,
  myData,
}) {
  const localStorageData =
    JSON.parse(localStorage.getItem("localstorageData")) || [];
  const item = localStorageData.find((item) => item.id === id);
  const [elementCount, setElementCount] = useState(item ? item.count : 0);

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

  return (
    <>
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
                  <img
                    src={item.img}
                    alt={item.desc}
                    loading="lazy"
                    onLoad={(e) => {
                      e.target.className = "loaded";
                    }}
                  />
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
