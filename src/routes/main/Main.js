import { Col, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import data from "./../../data";
import { useDispatch, useSelector } from "react-redux";
import { updateShoesList } from "./../../store/shoesSlice";
import shoes8Img from "./../../imges/shoes8.jpg";
import shoes9Img from "./../../imges/shoes9.jpg";

const ShoesFnc = (props) => {
  return (
    <Col>
      <Link to={"/detail/" + (props.index + 1)}>
        <>
          {props.index + 1 === 8 ? (
            <img src={shoes8Img} width="100%" />
          ) : props.index + 1 === 9 ? (
            <img src={shoes9Img} width="100%" />
          ) : (
            <img
              src={
                "https://codingapple1.github.io/shop/shoes" +
                (props.index + 1) +
                ".jpg"
              }
              width="100%"
            />
          )}
        </>
      </Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  );
};

const ShoesList = (props) => {
  let shoes = useSelector((state) => {
    return state.shoes;
  });
  let dispath = useDispatch();
  let [clickCount, setClickCount] = useState(1);
  let [showBtn, setShowBtn] = useState("block");
  let [loadingAlert, setLoadingAlert] = useState("none");
  let [doneAlert, setDoneAlert] = useState("none");

  useEffect(() => {
    if (props.checkRender !== true) {
      dispath(updateShoesList({ data: data }));
    }
    props.changeCheck(true);
    props.checkRedirectedToMain(true);
  }, []);

  return (
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
              let updateShoesArr = [...shoes, ...result.data];
              dispath(updateShoesList({ data: updateShoesArr }));

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
