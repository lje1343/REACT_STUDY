import { Outlet } from "react-router-dom";

const Event = () => {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
};

const EventDetail = (props) => {
  console.log(props.params);
  return props.params === "one" ? (
    <div>첫 주문시 양배추즙 서비스</div>
  ) : (
    <div>생일기념 쿠폰받기</div>
  );
};

export { Event, EventDetail };
