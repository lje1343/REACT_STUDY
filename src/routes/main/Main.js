import { Col, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

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
      <p>{props.shoes.price}</p>
    </Col>
  );
};

const ShoesList = (props) => {
  let [clickCount, setClickCount] = useState(1);
  let [showBtn, setShowBtn] = useState("block");
  let [loadingAlert, setLoadingAlert] = useState("none");
  let [doneAlert, setDoneAlert] = useState("none");

  return (
    <Container>
      <div>
        <Row>
          {props.shoes.map((e, i) => {
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
              let temp = [...props.shoes, ...result.data];
              props.addShoesList(temp);

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
      <div style={{ display: doneAlert }}>더이상 준비된 상품이 없습니다.</div>
    </Container>
  );
};

export default ShoesList;
