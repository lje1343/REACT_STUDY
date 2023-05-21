import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { serachAddr } from "./../../utils/index";
import { useState } from "react";
import { registerUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { isRegExp } from "./../../utils/index";

const Join = () => {
  let navigate = useNavigate();
  let dispath = useDispatch();
  let [chkEmailFalse, setChkEmailFalse] = useState("none");
  let [chkEmailTrue, setChkEmailTrue] = useState("none");
  let [chkPw, setChkPw] = useState("none");
  let [regExpEmail, setRegExpEmail] = useState("none");
  let [regExpPw, setRegExpPw] = useState("none");
  let [disabledPw, setDisabledPw] = useState(true);
  let [disabledBtn, setDisabledBtn] = useState(true);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [birthDate, setBirthDate] = useState("");
  let [address, setAddress] = useState("");
  let [userObj, setUserObj] = useState({});
  let userList = useSelector((state) => {
    return state.user;
  });
  const saveEmail = (event) => {
    const email = event.target.value;

    const resultRegExp = isRegExp(email, "email");
    if (resultRegExp === true) {
      setRegExpEmail("none");
      isEmailAlreadyExists(email);
      setEmail(email);
      checkJoin();
    } else {
      setRegExpEmail("block");
      setEmail(email);
    }
  };
  const savePw = (event) => {
    const password = event.target.value;

    const resultRegExp = isRegExp(password, "password");
    if (resultRegExp === true) {
      setRegExpPw("none");
      setPassword(password);
      password !== "" ? setDisabledPw(false) : setDisabledPw(true);
      checkJoin();
    } else {
      setRegExpPw("block");
      setPassword(password);
    }
  };
  const checkPw = (event) => {
    const check = event.target.value;
    password === check ? setChkPw("block") : setChkPw("none");
    checkJoin();
  };
  const saveName = (event) => {
    const name = event.target.value;
    setName(name);
    checkJoin();
  };
  const saveBirthDate = (event) => {
    const birthDate = event.target.value;
    setBirthDate(birthDate);
    checkJoin();
  };
  const saveAddress = (data) => {
    setAddress((address = data));
    checkJoin();
  };
  const checkJoin = () => {
    email !== "" &&
    password !== "" &&
    name !== "" &&
    birthDate !== "" &&
    address !== "" &&
    chkPw === "block" &&
    chkEmailTrue === "block"
      ? setDisabledBtn((disabledBtn = false))
      : setDisabledBtn((disabledBtn = true));

    setUserObj({ email, password, name, birthDate, address });
  };
  const isEmailAlreadyExists = (data) => {
    const existObj = userList.find((obj) => obj.email === data);
    if (existObj === undefined) {
      setChkEmailFalse("none");
      setChkEmailTrue("block");
    } else {
      setChkEmailFalse("block");
      setChkEmailTrue("none");
    }
  };

  return (
    <div style={{ margin: "10%" }}>
      <Form>
        <Form.Label>Email address</Form.Label>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={saveEmail}
          />
        </Form.Group>
        <div style={{ display: chkEmailFalse, color: "red" }}>
          이미 가입되어 있는 이메일입니다.
        </div>
        <div style={{ display: chkEmailTrue, color: "blue" }}>
          사용 가능한 이메일입니다.
        </div>
        <div style={{ display: regExpEmail, color: "red" }}>
          이메일 형식에 맞지 않습니다. ex. abc@def.com
        </div>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={savePw}
          />
        </Form.Group>
        <div style={{ display: regExpPw, color: "red" }}>
          비밀번호는 1개 이상의 문자와 특수문자가 포함된 8자 이상으로
          작성해주세요.
        </div>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={checkPw}
            disabled={disabledPw}
          />
        </Form.Group>
        <div style={{ display: chkPw, color: "blue" }}>
          비밀번호가 일치합니다.
        </div>
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Name"
            value={name}
            onChange={saveName}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDate">
          <Form.Label>Birth date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Birth date"
            value={birthDate}
            onChange={saveBirthDate}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="Address"
            onClick={() => {
              serachAddr((response) => {
                saveAddress(response);
              });
            }}
            value={address}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          style={{ marginBottom: "50px" }}
          onClick={() => {
            dispath(registerUser({ data: userObj }));
            navigate("/login");
          }}
          disabled={disabledBtn}
        >
          회원가입
        </Button>
        <div>가입된 계정이 있으신가요?</div>
        <Button
          variant="outline-primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </Button>
      </Form>
    </div>
  );
};

export default Join;
