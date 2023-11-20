import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Cart from "./components/cart/Cart";
import "./app.css";
import { myData } from "./components/Data/data";

function App() {
  const [allItemsCount, setAllItemsCount] = useState(JSON.parse(localStorage.getItem('allCount')) || 0);
  const [ basket, setBasket ] = useState(JSON.parse(localStorage.getItem('localstorageData')) || [])

  return (
    <>
      <Router>
        <Header allItemsCount={allItemsCount} />
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
              <>
              <div className="cart-container">
                {
                  basket.filter(x => x.count !== 0).map(item => {
                    return (
                      <Cart 
                      id={item.id}
                      count={item.count}
                      key={crypto.randomUUID()}
                      setAllItemsCount={setAllItemsCount}
                      allItemsCount={allItemsCount}
                      basket={basket}
                      setBasket={setBasket}
                    />
                    )

                  })
                }
              </div>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
