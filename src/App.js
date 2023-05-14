import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import mainImg from "./img/sea.avif";
import { createContext, useState } from "react";
import data from "./data.js";
import ShoesDetail from "./routes/Detail.js";
import Cart from "./routes/Cart.js";
import ShoesList from "./routes/main/Main.js";
import Event from "./routes/event/Event.js";
import EventDetail from "./routes/event/EventDetail.js";
import RecentlyViewed from "./routes/main/RecentlyViewed";
import Error from "./routes/Error";
import Login from "./routes/user/Login";
import Join from "./routes/user/Join";
import Header from "./routes/Navbar";

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let [inventory] = useState([10, 11, 12]);
  let [show, setShow] = useState(true);
  let [recentlyViewed, setRecentlyViewed] = useState([{}]);
  const addShoesList = (data) => {
    setShoes(data);
  };
  const changeShow = (data) => {
    setShow(data);
  };
  const changeRecentlyViewedList = (data) => {
    const checkExistObj = recentlyViewed.findIndex((obj) => obj.id === data.id);
    if (checkExistObj === -1) {
      if (recentlyViewed[0].hasOwnProperty("id")) {
        setRecentlyViewed((recentlyViewed) => [...recentlyViewed, data]);
      } else {
        setRecentlyViewed((recentlyViewed = [data]));
      }
    }
  };
  localStorage.setItem("shoes", JSON.stringify({ data: shoes }));
  localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg mainParent"
                style={{
                  backgroundImage: "url(" + mainImg + ")",
                }}
              >
                <RecentlyViewed className="mainChild"></RecentlyViewed>
              </div>
              <ShoesList shoes={shoes} addShoesList={addShoesList}></ShoesList>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <>
              <Context1.Provider value={{ inventory, shoes }}>
                <ShoesDetail
                  detailShoes={shoes}
                  changeRecentlyViewedList={changeRecentlyViewedList}
                ></ShoesDetail>
              </Context1.Provider>
            </>
          }
        />
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/event" element={<Event changeShow={changeShow}></Event>}>
          <Route
            path="one"
            element={
              <EventDetail
                params={"one"}
                show={show}
                changeShow={changeShow}
              ></EventDetail>
            }
          />
          <Route
            path="two"
            element={
              <EventDetail
                params={"two"}
                show={show}
                changeShow={changeShow}
              ></EventDetail>
            }
          />
        </Route>
        <Route path="/join" element={<Join></Join>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/logout" element={<Login></Login>} />
        <Route path="*" element={<Error></Error>} />
      </Routes>
    </div>
  );
}

export default App;
