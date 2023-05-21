import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addShoes } from "../../store/saveCartSlice.js";
import { updateViewdList } from "../../store/recentlyViewedSlice.js";
import RecentlyViewed from "./RecentlyViewed.js";
import shoes8Img from "./../../imges/shoes8.jpg";
import shoes9Img from "./../../imges/shoes9.jpg";
import { getLocalStorage } from "./../../utils/index.js";

let Div = styled.div`
  background: ${(props) => props.bg};
  color: black;
  padding: 10px;
`;

const ShoesDetail = () => {
  let recentlyViewed = useSelector((state) => {
    return state.shoes;
  });
  let [showAlert, setShowAlert] = useState("block");
  let [tabChange, setTabChange] = useState(0);
  let [enterDetail, setEnterDetail] = useState("");
  let dispath = useDispatch();
  let navigate = useNavigate();
  let params = useParams().id;
  let [checkLogin, setCheckLogin] = useState(false);
  let [userData, setUserData] = useState(false);

  useEffect(() => {
    const userData = getLocalStorage("loginUser");
    setUserData(userData);
    if (userData === undefined) {
      dispath(
        updateViewdList({
          user: "",
          data: recentlyViewed[params - 1],
        })
      );
      setCheckLogin(false);
    } else {
      dispath(
        updateViewdList({
          user: userData.id,
          data: recentlyViewed[params - 1],
        })
      );
      setCheckLogin(true);
    }
  }, []);

  useEffect(() => {
    let set = setTimeout(() => {
      setShowAlert("none");
    }, 2000);
    return () => {
      clearTimeout(set);
    };
  });

  useEffect(() => {
    setTimeout(() => {
      setEnterDetail("end");
    }, 100);
  }, []);

  const goPage = () => {
    if (checkLogin) {
      dispath(
        addShoes({
          user: userData.id,
          data: recentlyViewed[params - 1],
        })
      );
      navigate("/cart");
    } else {
      window.alert("로그인 후 이용해 주세요.");
      navigate("/login");
    }
  };

  return (
    <div className="mainDiv">
      <RecentlyViewed className="mainChild"></RecentlyViewed>
      <div className={"container start " + enterDetail}>
        <br />
        <div className="alert alert-warning" style={{ display: showAlert }}>
          2초이내 구매시 할인 !
        </div>
        <div className="row">
          <div className="col-md-6">
            <>
              {parseInt(params) === 8 ? (
                <img src={shoes8Img} width="100%" />
              ) : parseInt(params) === 9 ? (
                <img src={shoes9Img} width="100%" />
              ) : (
                <img
                  src={
                    "https://codingapple1.github.io/shop/shoes" +
                    params +
                    ".jpg"
                  }
                  width="100%"
                />
              )}
            </>
          </div>
          <div className="col-md-5">
            <h4 className="pt-5">{recentlyViewed[params - 1].title}</h4>
            <p>{recentlyViewed[params - 1].content}</p>
            <p>{recentlyViewed[params - 1].price}원</p>
            <button className="btn btn-danger" onClick={() => goPage()}>
              주문하기
            </button>
          </div>
        </div>
        <Div bg={params === "1" ? "black" : params === "2" ? "pink" : "grey"} />
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
          detailShoes={recentlyViewed[[params - 1]]}
        />
      </div>
    </div>
  );
};

let TabContent = ({ tabChange, detailShoes }) => {
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
