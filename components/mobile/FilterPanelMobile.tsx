import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import FilterPanel from "../FilterPanel";
import { FilterPanelProps } from "../../model/filterModel";

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
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

export default function FilterPanelMobile({
  filterConfig,
  date,
  submitFilterHandler,
}: FilterPanelProps) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Filter
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={
          <FilterPanel
            filterConfig={filterConfig}
            submitFilterHandler={submitFilterHandler}
          />
        }
      />
    </div>
  );
}
