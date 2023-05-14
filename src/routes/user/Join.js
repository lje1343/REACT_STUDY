import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Join = () => {
  let navigate = useNavigate();
  return (
    <div style={{ margin: "10%" }}>
      <Form>
        <Form.Label>Email address</Form.Label>
        <Form.Group
          className="mb-3"
          controlId="formGroupEmail"
          style={{ display: "flex" }}
        >
          <Form.Control type="email" placeholder="Email" />

          <Button
            variant="danger"
            style={{ flexBasis: "10%" }}
            onClick={() => {}}
          >
            중복확인
          </Button>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="email" placeholder="Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Birth date</Form.Label>
          <Form.Control type="date" placeholder="Birth date" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Address" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{ marginBottom: "50px" }}
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
