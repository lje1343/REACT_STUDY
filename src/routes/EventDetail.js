import { Modal, Button } from "react-bootstrap";

const EventDetail = (props) => {
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={props.show} onHide={props.show}>
        <Modal.Header closeButton>
          <Modal.Title>오늘의 이벤트</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.params === "one" ? (
            <p>첫 주문시 양말 증정!</p>
          ) : (
            <p>생일이세요? 그럼 무료배송!</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.changeShow(false);
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventDetail;
