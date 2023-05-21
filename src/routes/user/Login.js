import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { setLocalStorage, getLocalStorage } from "./../../utils/index";

const Login = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [userObj, setUserObj] = useState({});
  let [disabledBtn, setDisabledBtn] = useState(true);
  let userList = useSelector((state) => {
    return state.user;
  });
  const saveEmail = (event) => {
    const email = event.target.value;
    setEmail(email);
    checkLogin();
  };
  const savePw = (event) => {
    const password = event.target.value;
    setPassword(password);
    checkLogin();
  };
  const isLoginAllowed = (data) => {
    const existEmail = userList.find((obj) => obj.email === data.email);
    const existPw = userList.find((obj) => obj.password === data.password);
    if (existEmail === undefined) {
      window.alert("존재하지 않는 계정입니다.");
    } else if (existEmail !== undefined && existPw === undefined) {
      window.alert("비밀번호가 일치하지 않습니다.");
    } else {
      const loginUser = userList.filter((obj) => obj.email === data.email);
      setLocalStorage("loginUser", loginUser[0]);
      const userData = getLocalStorage("loginUser");
      window.alert("환영합니다. " + `${userData.name}` + "님");
      navigate("/");
    }
  };
  const checkLogin = () => {
    email !== "" && password !== ""
      ? setDisabledBtn((disabledBtn = false))
      : setDisabledBtn((disabledBtn = true));
  };

  return (
    <div style={{ margin: "10%" }}>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={saveEmail}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={savePw}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          style={{ marginBottom: "50px" }}
          onClick={() => {
            setUserObj((userObj = { email, password }));
            isLoginAllowed(userObj);
          }}
          disabled={disabledBtn}
        >
          로그인
        </Button>
        <div>가입된 계정이 없으신가요?</div>
        <Button
          variant="outline-primary"
          onClick={() => {
            navigate("/join");
          }}
        >
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default Login;
