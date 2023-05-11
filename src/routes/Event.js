import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

let H5 = styled.div`
  background: #ffff00;
  padding: 10px;
`;

const Event = (props) => {
  let navigate = useNavigate();

  return (
    <div>
      <br />
      <H5>오늘의 이벤트를 확인해보세요</H5>
      <br />
      <div
        onClick={() => {
          props.changeShow(true);
          navigate("/event/one");
        }}
      >
        ♡ 첫번째 이벤트 ♡
      </div>
      <div
        onClick={() => {
          props.changeShow(true);
          navigate("/event/two");
        }}
      >
        ♡ 두번째 이벤트 ♡
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Event;
