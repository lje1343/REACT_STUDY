import errorImg from "../img/error.avif";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Error = () => {
  let navigate = useNavigate();

  return (
    <>
      <div
        className="main-bg mainParent"
        style={{
          backgroundImage: "url(" + errorImg + ")",
          width: "50%",
          margin: "10%",
        }}
      ></div>
      <Button
        variant="outline-primary"
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </Button>
    </>
  );
};

export default Error;
