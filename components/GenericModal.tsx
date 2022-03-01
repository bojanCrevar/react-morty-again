import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { RootState } from "../model/storeModel";

type GenericModalProps = {
  modalShow: boolean;
  setModalShow: (arg: boolean) => void;
  children: React.ReactNode;
};

function MyVerticallyCenteredModal(props: any) {
  const isDarkTheme = useSelector(
    (state: RootState) => state.profile.isDarkTheme
  );
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={isDarkTheme ? " dark" : ""}
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
