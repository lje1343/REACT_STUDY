import { Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import shoes8Img from "./../../imges/shoes8.jpg";
import shoes9Img from "./../../imges/shoes9.jpg";
import { getLocalStorage } from "./../../utils/index.js";

const RecentlyViewed = () => {
  let navigate = useNavigate();
  let [showAccordion, setAccordion] = useState("block");
  let [checkLogin, setCheckLogin] = useState(false);
  let [userEmail, setUserEmail] = useState("");

  let recentlyViewed = useSelector((state) => {
    return state.recentlyViewed;
  });

  if (checkLogin) {
    recentlyViewed = recentlyViewed.filter((obj) => {
      return obj.user === userEmail;
    });
  } else {
    recentlyViewed = recentlyViewed.filter((obj) => {
      return obj.user === "";
    });
  }

  useEffect(() => {
    const userData = getLocalStorage("loginUser");
    if (userData === undefined) {
      setCheckLogin(false);
    } else {
      setUserEmail(userData.email);
      setCheckLogin(true);
    }
  }, []);

  useEffect(() => {
    recentlyViewed.length === 0 ? setAccordion("none") : setAccordion("block");
  }, [recentlyViewed]);

  return (
    <>
      <Accordion
        alwaysOpen
        className="mainChild"
        style={{ display: showAccordion }}
      >
        <h5>💖 최근 본 상품 💖</h5>
        {recentlyViewed.map((e, i) => {
          return (
            <Accordion.Item eventKey={i} key={i}>
              <Accordion.Header>{e.title}</Accordion.Header>
              <Accordion.Body>
                <div width="25%">
                  <>
                    {Number(e.id + 1) === 8 ? (
                      <img
                        src={shoes8Img}
                        width="150px"
                        height="100px"
                        onClick={() => {
                          navigate(`/detail/${e.id + 1}`);
                        }}
                      />
                    ) : Number(e.id + 1) === 9 ? (
                      <img
                        src={shoes9Img}
                        width="150px"
                        height="100px"
                        onClick={() => {
                          navigate(`/detail/${e.id + 1}`);
                        }}
                      />
                    ) : (
                      <img
                        src={
                          "https://codingapple1.github.io/shop/shoes" +
                          Number(e.id + 1) +
                          ".jpg"
                        }
                        width="150px"
                        height="100px"
                        onClick={() => {
                          navigate(`/detail/${e.id + 1}`);
                        }}
                      />
                    )}
                  </>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
};

export default RecentlyViewed;
