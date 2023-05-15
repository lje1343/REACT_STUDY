import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { changeName, addAge } from "./../store/userSlice.js";
import { changeQuantityShoes, deleteShoes } from "./../store/saveCartSlice.js";
import RecentlyViewed from "./main/RecentlyViewed.js";

const Cart = () => {
  let store = useSelector((state) => {
    return state;
  });
  let dispath = useDispatch();
  return (
    <div className="mainDiv">
      <RecentlyViewed className="mainChild"></RecentlyViewed>
      <br />
      <h5>
        {store.user.name}님의 카트입니다. ({store.user.age}세)
      </h5>
      {/* <Button
        variant="outline-warning"
        onClick={() => {
          dispath(addAge(10));
        }}
      >
        +
      </Button> */}
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
    </div>
  );
};

export default Cart;
