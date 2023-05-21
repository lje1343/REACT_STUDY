import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { changeQuantityShoes, deleteShoes } from "./../store/saveCartSlice.js";
import RecentlyViewed from "./main/RecentlyViewed.js";
import { getLocalStorage } from "./../utils/index.js";
import { useEffect, useState } from "react";

const Cart = () => {
  let [userName, setUserName] = useState("");
  let store = useSelector((state) => {
    return state;
  });
  let dispath = useDispatch();

  useEffect(() => {
    const userData = getLocalStorage("loginUser");
    setUserName(userData.name);
  }, []);

  return (
    <div className="mainDiv">
      <RecentlyViewed className="mainChild"></RecentlyViewed>
      <br />
      <h5>{userName}님의 카트입니다.</h5>
      <br />
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {store.saveCart.map((e, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.count}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    onClick={() => {
                      dispath(changeQuantityShoes({ type: "plus", data: e }));
                    }}
                  >
                    +
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      dispath(changeQuantityShoes({ type: "minus", data: e }));
                    }}
                  >
                    -
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispath(deleteShoes({ data: e }));
                    }}
                  >
                    삭제하기
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        variant="outline-success"
        style={{ right: "100px" }}
        onClick={() => {}}
        // TODO :: alert + remove cart list
      >
        결제하기
      </Button>
    </div>
  );
};

export default Cart;
