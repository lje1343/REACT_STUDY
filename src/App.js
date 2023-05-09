import "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Row } from "react-bootstrap";
import mainImg from "./img/sea.avif";
import { useEffect, useState } from "react";
import data from "./data.js";
import ShoesDetail from "./routes/detail.js";
import ShoesFnc from "./routes/main.js";
import { Event, EventDetail } from "./routes/event.js";
import React from "react"; // 개인 노트북 문제
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let [clickCount, setClickCount] = useState(1);
  let [showBtn, setShowBtn] = useState("block");
  let [loadingAlert, setLoadingAlert] = useState("none");
  let [doneAlert, setDoneAlert] = useState("none");
  let navigate = useNavigate();

    useEffect(() => {
      setLoadingAlert((loadingAlert = "block"));
    let set = setTimeout(() => {
      setLoadingAlert((loadingAlert = "none"));
    }, 1000); 
    return () => {
      clearTimeout(set);
    };
  }, [clickCount]);

  // TODO :: 응용3번 아직 더 다듬어야한다 (성공/실패이후로 조건 바꿔야함)

      useEffect(() => {
        setDoneAlert((doneAlert = "block"));
    let set = setTimeout(() => {
      setDoneAlert((doneAlert = "none"));
    }, 1000); 
    return () => {
      clearTimeout(set);
    };
  }, [showBtn]);

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
                <button onClick={() => {
                    axios.get('https://codingapple1.github.io/shop/data3.json')
                    .then((result) => {
                      if(clickCount !== 2){
                        console.log(result.data)
                        let temp = [...shoes, ...result.data]
                        setShoes(temp)
                        setClickCount(clickCount + 1);
                      }else{
                        setShowBtn("none")
                      }
                    })
                    .catch(() => {
                      console.log('데이터 요청 실패')
                    })
                }} style={{ display: showBtn }}>+ 더보기 {clickCount}번째</button>
              <div style={{ display: loadingAlert }}>로딩중입니다.....</div>
              <div style={{ display: doneAlert }}>더이상 준비된 상품이 없습니다.</div>
              </Container>
            </>
          }
        />
        {/* detail */}
        <Route
          path="/detail/:id"
          element={
            <>
              <ShoesDetail detailShoes={shoes}></ShoesDetail>
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
