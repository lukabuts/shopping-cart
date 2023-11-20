import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import "./app.css";
import { myData } from "./components/Data/data";
import CartPage from "./components/cart/CartPage";

function App() {
  const [allItemsCount, setAllItemsCount] = useState(
    JSON.parse(localStorage.getItem("allCount")) || 0
  );
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("localstorageData")) || []
  );

  useEffect(() => {
    localStorage.setItem("allCount", JSON.stringify(allItemsCount));
  }, [allItemsCount]);

  return (
    <>
      <Router>
        <Header allItemsCount={allItemsCount} basket={basket} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                {myData.map((item) => (
                  <Body
                    key={item.id}
                    id={item.id}
                    img={item.img}
                    desc={item.desc}
                    name={item.name}
                    price={item.price}
                    setAllItemsCount={setAllItemsCount}
                    allItemsCount={allItemsCount}
                    basket={basket}
                    setBasket={setBasket}
                  />
                ))}
              </div>
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage
                setAllItemsCount={setAllItemsCount}
                allItemsCount={allItemsCount}
                basket={basket}
                setBasket={setBasket}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
