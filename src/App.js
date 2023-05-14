import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Row, Button } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import mainImg from "./img/sea.avif";
import { createContext, useState } from "react";
import data from "./data.js";
import ShoesDetail from "./routes/Detail.js";
import Cart from "./routes/Cart.js";
import ShoesFnc from "./routes/main/Main.js";
import Event from "./routes/event/Event.js";
import EventDetail from "./routes/event/EventDetail.js";
import RecentlyViewed from "./routes/main/RecentlyViewed";

export let Context1 = createContext();

function App() {
  let navigate = useNavigate();

  let [shoes, setShoes] = useState(data);
  let [clickCount, setClickCount] = useState(1);
  let [showBtn, setShowBtn] = useState("block");
  let [loadingAlert, setLoadingAlert] = useState("none");
  let [doneAlert, setDoneAlert] = useState("none");
  let [inventory] = useState([10, 11, 12]);
  let [show, setShow] = useState(true);
  let [recentlyViewed, setRecentlyViewed] = useState([{}]);

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
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              ShoeShop
            </Nav.Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event");
              }}
            >
              Event
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

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
              <Container>
                <div>
                  <Row>
                    {shoes.map((e, i) => {
                      return <ShoesFnc shoes={e} index={i} key={i}></ShoesFnc>;
                    })}
                  </Row>
                </div>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setLoadingAlert((loadingAlert = "block"));
                    axios
                      .get(
                        "https://codingapple1.github.io/shop/data" +
                          Number(clickCount + 1) +
                          ".json"
                      )
                      .then((result) => {
                        let temp = [...shoes, ...result.data];
                        setShoes(temp);

                        if (clickCount !== 2) {
                          setLoadingAlert((loadingAlert = "none"));
                          setClickCount(clickCount + 1);
                        } else {
                          setLoadingAlert((loadingAlert = "none"));
                          setDoneAlert((doneAlert = "block"));
                          setShowBtn("none");
                          setTimeout(() => {
                            setDoneAlert((doneAlert = "none"));
                          }, 1000);
                        }
                      })
                      .catch(() => {
                        setLoadingAlert((loadingAlert = "none"));
                        console.log("데이터 요청 실패");
                      });
                  }}
                  style={{ display: showBtn }}
                >
                  + 더보기 ({clickCount})
                </Button>
                <div style={{ display: loadingAlert }}>loading.....</div>
                <div style={{ display: doneAlert }}>
                  더이상 준비된 상품이 없습니다.
                </div>
              </Container>
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

        <Route path="*" element={<div>404 error :: 잘못된 경로입니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;
