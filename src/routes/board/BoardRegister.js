import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BoardRegister = () => {
  let navigate = useNavigate();
  return (
    <div style={{ margin: "10%" }}>
      <Form>
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
          type="button"
          style={{ marginBottom: "50px" }}
          onClick={() => {}}
        >
          초기화
        </Button>
        <Button
          variant="primary"
          type="button"
          style={{ marginBottom: "50px" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </Button>
        <Button
          variant="primary"
          type="button"
          style={{ marginBottom: "50px" }}
          onClick={() => {
            navigate("/board");
          }}
        >
          등록하기
        </Button>
      </Form>
    </div>
  );
};

export default BoardRegister;
