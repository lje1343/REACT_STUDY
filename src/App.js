import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Row, Button } from "react-bootstrap";
import mainImg from "./img/sea.avif";
import { createContext, useState } from "react";
import data from "./data.js";
import ShoesDetail from "./routes/detail.js";
import ShoesFnc from "./routes/main.js";
import { Event, EventDetail } from "./routes/event.js";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

export let Context1 = createContext(); // Context API

function App() {
  let navigate = useNavigate(); // url routes
  
  let [shoes, setShoes] = useState(data); // shoes data
  let [clickCount, setClickCount] = useState(1); // click count
  let [showBtn, setShowBtn] = useState("block"); // btn show
  let [loadingAlert, setLoadingAlert] = useState("none"); // loading text
  let [doneAlert, setDoneAlert] = useState("none"); // done text
  
  let [inventory] = useState([10, 11, 12]);

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
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/1");
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        {/* main */}
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg"
                style={{ backgroundImage: "url(" + mainImg + ")" }}
              ></div>
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
                      .get("https://codingapple1.github.io/shop/data3.json")
                      .then((result) => {
                        if (clickCount !== 2) {
                          setLoadingAlert((loadingAlert = "none"));
                          console.log(result.data);
                          let temp = [...shoes, ...result.data];
                          setShoes(temp);
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
                  + 더보기 {clickCount}번째
                </Button>
                <div style={{ display: loadingAlert }}>loading.....</div>
                <div style={{ display: doneAlert }}>
                  더이상 준비된 상품이 없습니다.
                </div>
              </Container>
            </>
          }
        />
        {/* detail */}
        <Route
          path="/detail/:id"
          element={
            <>
            <Context1.Provider value={{inventory, shoes}}>
              <ShoesDetail detailShoes={shoes}></ShoesDetail>
              </Context1.Provider>
            </>
          }
        />

        {/* event */}
        <Route path="/event" element={<Event></Event>}>
          <Route
            path="one"
            element={<EventDetail params={"one"}></EventDetail>}
          />
          <Route
            path="two"
            element={<EventDetail params={"two"}></EventDetail>}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>404 :: 없는페이지입니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;
