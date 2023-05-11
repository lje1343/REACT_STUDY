import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
// import { Context1 } from "../App.js";
import { useDispatch } from "react-redux";
import { addShoes } from "./../store/saveCartSlice.js";

let Div = styled.div`
  background: ${(props) => props.bg};
  color: black;
  padding: 10px;
`;

const ShoesDetail = (props) => {
  let [showAlert, setShowAlert] = useState("block");
  let [quantity, setQuantity] = useState(0);
  let [tabChange, setTabChange] = useState(0);
  let [enterDetail, setEnterDetail] = useState("");
  // let {inventory, shoes} = useContext(Context1)

  let dispath = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    let set = setTimeout(() => {
      setShowAlert("none");
    }, 2000);
    return () => {
      clearTimeout(set);
    };
  });

  useEffect(() => {
    if (isNaN(quantity)) {
      alert("숫자만 입력해주세요.");
    }
  }, [quantity]);

  useEffect(() => {
    setTimeout(() => {
      setEnterDetail("end");
    }, 100);
  }, []);

  const params = useParams().id;
  return (
    <div className={"container start " + enterDetail}>
      <Div bg={params === "1" ? "black" : params === "2" ? "pink" : "grey"} />
      <br />
      <div className="alert alert-warning" style={{ display: showAlert }}>
        2초이내 구매시 할인 !
      </div>
      <div className="start">aaaaa</div>
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes" + params + ".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          {/* <input
            placeholder="수량을 입력해주세요."
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          ></input> */}
          <h4 className="pt-5">{props.detailShoes[params - 1].title}</h4>
          <p>{props.detailShoes[params - 1].content}</p>
          <p>{props.detailShoes[params - 1].price}원</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispath(addShoes({ data: props.detailShoes[params - 1] }));
              navigate("/cart");
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      <br />
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTabChange(0);
            }}
          >
            명칭
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTabChange(1);
            }}
          >
            설명
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTabChange(2);
            }}
          >
            가격
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent
        tabChange={tabChange}
        detailShoes={props.detailShoes[[params - 1]]}
      />
    </div>
  );
};

let TabContent = ({ tabChange, detailShoes }) => {
  // let {inventory, shoes} = useContext(Context1)
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [tabChange]);

  return (
    <>
      <br />
      <div className={"start " + fade}>
        {
          [
            <div>{detailShoes.title}</div>,
            <div>{detailShoes.content}</div>,
            <div>{detailShoes.price}</div>,
          ][tabChange]
        }
      </div>
    </>
  );
};

export default ShoesDetail;
