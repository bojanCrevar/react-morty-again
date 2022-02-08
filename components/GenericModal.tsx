import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

type GenericModalProps = {
  modalShow: boolean;
  setModalShow: (arg: boolean) => void;
  children: React.ReactNode;
};

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>{props.content}</Modal.Body>
      <Modal.Header>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Header>
    </Modal>
  );
}

function GenericModal({
  children,
  modalShow,
  setModalShow,
}: GenericModalProps) {
  return (
    <MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      content={children}
    />
  );
}

export default GenericModal;
