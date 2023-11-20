/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./body.css";
import { useEffect, useState } from "react";

export default function Body({
  id,
  img,
  desc,
  name,
  price,
  setAllItemsCount,
  allItemsCount,
  basket,
  setBasket,
}) {
  const localStorageData =
    JSON.parse(localStorage.getItem("localstorageData")) || [];
  const item = localStorageData.find((item) => item.id === id);
  const [elementCount, setElementCount] = useState(item ? item.count : 0);

  let search = basket.find((x) => x.id === id);

  useEffect(() => {
    if (search === undefined) {
      setBasket((basket) => [
        ...basket,
        {
          id: id,
          count: elementCount,
        },
      ]);
    }
  }, [elementCount]);

  function pushBasket(type) {
    if (search === undefined) {
      setBasket((basket) => [
        ...basket,
        {
          id: id,
          count: elementCount,
        },
      ]);
    } else if (type === "plus") {
      search.count++;
    } else if (type === "minus") {
      search.count--;
    }

    localStorage.setItem("localstorageData", JSON.stringify(basket));
  }

  return (
    <div className="item" key={id}>
      <div className="img-div">
        <img src={img} alt={desc} />
      </div>
      <div className="details">
        <h3>{name}</h3>
        <p>{desc}</p>
        <div className="more-info">
          <h4>$ {price}</h4>
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
            {elementCount}
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
        </div>
      </div>
    </div>
  );
}
