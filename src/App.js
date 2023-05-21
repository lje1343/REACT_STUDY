import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import mainImg from "./imges/sea.avif";
import { useState } from "react";
import ShoesDetail from "./routes/main/Detail.js";
import Cart from "./routes/Cart.js";
import ShoesList from "./routes/main/Main.js";
import Event from "./routes/event/Event.js";
import EventDetail from "./routes/event/EventDetail.js";
import RecentlyViewed from "./routes/main/RecentlyViewed";
import Error from "./routes/Error";
import Login from "./routes/user/Login";
import Join from "./routes/user/Join";
import Header from "./routes/Navbar";
import BoardList from "./routes/board/BoardList";
import BoardRegister from "./routes/board/BoardRegister";
import BoardDetail from "./routes/board/BoardDetail";
import Profile from "./routes/user/Profile";

function App() {
  let [show, setShow] = useState(true);
  let [checkRender, setCheckRender] = useState(false);
  let [isRedirectedToMain, setIsRedirectedToMain] = useState(false); // TODO :: LoginToMain
  const changeShow = (data) => {
    setShow(data);
  };
  const changeCheck = (data) => {
    setCheckRender(data);
  };
  const checkRedirectedToMain = (data) => {
    setIsRedirectedToMain(data);
  };

  return (
    <div className="App mainDiv">
      <Header isRedirectedToMain={isRedirectedToMain}></Header>
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
                checkRedirectedToMain={checkRedirectedToMain}
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
        <Route path="/profile" element={<Profile></Profile>} />
        <Route
          path="/board/register"
          element={<BoardRegister></BoardRegister>}
        />
        <Route path="/board/detail/:id" element={<BoardDetail></BoardDetail>} />
        <Route path="/board/update/:id" element={<BoardDetail></BoardDetail>} />
        <Route path="/board" element={<BoardList></BoardList>}></Route>
        <Route path="*" element={<Error></Error>} />
      </Routes>
    </div>
  );
}

export default App;
