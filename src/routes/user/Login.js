import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  return (
    <div style={{ margin: "10%" }}>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{ marginBottom: "50px" }}
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
