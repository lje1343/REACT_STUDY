import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShoesFnc = (props) => {
  return (
    <Col>
      <Link to={"/detail/" + (props.index + 1)}>
        <img
          src={
            "https://codingapple1.github.io/shop/shoes" +
            (props.index + 1) +
            ".jpg"
          }
          width="80%"
        />
      </Link>
      <h4>{props.shoes.title}</h4>
      {/* <p>{props.shoes.content}</p> */}
      <p>{props.shoes.price}</p>
    </Col>
  );
};

export default ShoesFnc;


