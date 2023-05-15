import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import mainImg from "./img/sea.avif";
import { useState } from "react";
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

function App() {
  let [show, setShow] = useState(true);
  let [checkRender, setCheckRender] = useState(false);
  const changeShow = (data) => {
    setShow(data);
  };
  const changeCheck = (data) => {
    setCheckRender(data);
  };

  return (
    <div className="App mainDiv">
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg "
                style={{
                  backgroundImage: "url(" + mainImg + ")",
                }}
              >
                <RecentlyViewed className="mainChild"></RecentlyViewed>
              </div>
              <ShoesList
                checkRender={checkRender}
                changeCheck={changeCheck}
              ></ShoesList>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <>
              <ShoesDetail></ShoesDetail>
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
