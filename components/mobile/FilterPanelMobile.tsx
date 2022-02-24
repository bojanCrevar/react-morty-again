import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import FilterPanel from "../FilterPanel";
import { FilterPanelProps } from "../../model/filterModel";
import { useSelector } from "react-redux";
import { RootState } from "../../model/storeModel";

function MyVerticallyCenteredModal(props: any) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={theme ? "dark" : ""}
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
  triggerSearch,
  setActivePage,
}: FilterPanelProps) {
  const [modalShow, setModalShow] = useState(false);

  function closeModal() {
    setModalShow(false);
  }

  return (
    <div className="w-1/3 items-end">
      <Button
        variant="primary"
        className="w-full"
        onClick={() => setModalShow(true)}
      >
        Filter
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={
          <FilterPanel
            filterConfig={filterConfig}
            setActivePage={setActivePage}
            triggerSearch={triggerSearch}
            closeModal={closeModal}
          />
        }
      />
    </div>
  );
}
