import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

let Div = styled.div`
  background: ${(props) => props.bg};
  color: black;
  padding: 10px;
`;

const ShoesDetail = (props) => {
  // hook :: mount/update, html 렌더링 이후 동작
  let [count, setCount] = useState(0);
  let [showAlert, setShowAlert] = useState("block");
  let [quantity, setQuantity] = useState(0);

  useEffect(() => {
    let set = setTimeout(() => {
      setShowAlert((showAlert = "none"));
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

  const params = useParams().id;
  return (
    <div className="container">
      <Div bg={params === "1" ? "black" : params === "2" ? "pink" : "grey"} />
      <div className="alert alert-warning" style={{ display: showAlert }}>
        2초이내 구매시 할인 !
      </div>
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        button
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes" + params + ".jpg"}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <input
            placeholder="수량을 입력해주세요."
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          ></input>
          <h4 className="pt-5">{props.detailShoes[params - 1].title}</h4>
          <p>{props.detailShoes[params - 1].content}</p>
          <p>{props.detailShoes[params - 1].price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default ShoesDetail;
