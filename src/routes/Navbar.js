import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();

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
          {/* 임시 */}
          <Nav.Link
            onClick={() => {
              navigate("/join");
            }}
          >
            Join
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
