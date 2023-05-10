import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { changeName, addShoes } from "./../store.js";

const Cart = () => {
  let store = useSelector((state) => {
    return state;
  });
  //   let saveCart = useSelector((state) => {
  //     return state.saveCart;
  //   });
  let dispath = useDispatch();
  return (
    <div>
      <br />
      <div>{store.user}님의 카트입니다.</div>
      <br />
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
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
                      dispath(addShoes());
                    }}
                  >
                    +
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
