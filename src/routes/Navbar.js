import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { getLocalStorage } from "./../utils/index.js";

const Header = (prop) => {
  let navigate = useNavigate();
  let [checkLogin, setCheckLogin] = useState(false);
  let [userName, setUserName] = useState("");

  //   let result = useQuery(
  //     ["userName"],
  //     async () =>
  //       await axios
  //         .get("https://codingapple1.github.io/userdata.json")
  //         .then((result) => {
  //           return result.data;
  //         })
  //   );

  useEffect(() => {
    const userData = getLocalStorage("loginUser");
    if (userData === undefined) {
      setCheckLogin(false);
    } else {
      setUserName(userData.name);
      setCheckLogin(true);
    }
  }, []);

  return (
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
            style={{ display: checkLogin === true ? "block" : "none" }}
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
          <Nav.Link
            onClick={() => {
              navigate("/board");
            }}
          >
            Board
          </Nav.Link>
        </Nav>

        <Nav>
          <div style={{ display: checkLogin === true ? "block" : "none" }}>
            안녕하세요. {userName}님
          </div>
          <div
            style={{ display: checkLogin === false ? "block" : "none" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인을 해주세요.
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
