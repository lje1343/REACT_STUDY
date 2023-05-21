import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import RecentlyViewed from "./../main/RecentlyViewed";
import { getLocalStorage } from "./../../utils/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BoardList = () => {
  let navigate = useNavigate();
  let [checkLogin, setCheckLogin] = useState(false);
  let boardList = useSelector((state) => {
    return state.board;
  });

  useEffect(() => {
    const userData = getLocalStorage("loginUser");
    if (userData === undefined) {
      setCheckLogin(false);
    } else {
      setCheckLogin(true);
    }
  }, []);

  // TODO :: board

  return (
    <div className="mainDiv">
      <RecentlyViewed className="mainChild"></RecentlyViewed>
      <br />
      <Form>
        <Form.Label>검색해보세요. 🔍</Form.Label>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <div style={{ display: "flex", width: "90%" }}>
            <div style={{ marginRight: "5%", flexBasis: "10%" }}> 검색명 </div>
            <Form.Control type="text" placeholder="내용을 입력해주세요." />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupType">
          <div style={{ display: "flex", width: "90%" }}>
            <div style={{ marginRight: "5%", flexBasis: "10%" }}> 종류 </div>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">후기</option>
              <option value="2">자유</option>
              <option value="3">기타</option>
            </Form.Select>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupDate">
          <div style={{ display: "flex", width: "90%" }}>
            <div style={{ marginRight: "5%", flexBasis: "10%" }}> 날짜 </div>
            <Form.Control type="date" placeholder="내용을 입력해주세요." />
          </div>
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit" style={{ marginBottom: "50px" }}>
        검색
      </Button>
      <Button
        variant="primary"
        type="outline-submit"
        style={{
          marginBottom: "50px",
          display: checkLogin === true ? "block" : "none",
        }}
        onClick={() => {
          navigate("/board/register");
        }}
      >
        글작성
      </Button>
      <br />
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>내용</th>
            <th>종류</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((e, i) => {
            return (
              <tr key={i}>
                <td
                  style={{ color: "blue" }}
                  onclick={() => {
                    navigate(`board/detail/${e.id}`);
                  }}
                ></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default BoardList;
