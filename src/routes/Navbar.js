import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

const Header = () => {
  let navigate = useNavigate();

  let result = useQuery(
    ["userName"],
    async () =>
      await axios
        .get("https://codingapple1.github.io/userdata.json")
        .then((result) => {
          return result.data;
        })
  ); // TODO :: connect Login

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

        <Nav>
          {/* <Button
            variant="outline-primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button> */}
        </Nav>
        <Nav>
          <div>
            {result.isLoading && "loading....."}
            {result.error && "error"}
            안녕하세요. {result.data && result.data.name}님
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
