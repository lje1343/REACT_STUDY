import { Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const RecentlyViewed = () => {
  let store = useSelector((state) => {
    return state.recentlyViewed;
  });
  let navigate = useNavigate();
  let [showAccordion, setAccordion] = useState("block");

  useEffect(() => {
    store.length === 0 ? setAccordion("none") : setAccordion("block");
  }, [store]);

  return (
    <>
      <Accordion
        alwaysOpen
        className="mainChild"
        style={{ display: showAccordion }}
      >
        <h5>💖 최근 본 상품 💖</h5>
        {store.map((e, i) => {
          return (
            <Accordion.Item eventKey={i} key={i}>
              <Accordion.Header>{e.title}</Accordion.Header>
              <Accordion.Body>
                <div width="25%">
                  <img
                    src={
                      "https://codingapple1.github.io/shop/shoes" +
                      (Number(e.id) + 1) +
                      ".jpg"
                    }
                    width="150px"
                    height="100px"
                    onClick={() => {
                      navigate(`/detail/${e.id + 1}`);
                      // 8,9번 url :: 404 error
                    }}
                  />
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
