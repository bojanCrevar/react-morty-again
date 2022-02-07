import Button from "react-bootstrap/Button";
import { useState } from "react";
import FilterPanel from "../FilterPanel";
import { FilterPanelProps } from "../../model/filterModel";
import GenericModal from "../GenericModal";

export default function FilterPanelMobile({
  filterConfig,
  date,
  setFilterObject,
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
      <GenericModal modalShow={modalShow} setModalShow={setModalShow}>
        <FilterPanel
          filterConfig={filterConfig}
          setFilterObject={setFilterObject}
          setActivePage={setActivePage}
          triggerSearch={triggerSearch}
          closeModal={closeModal}
        />
      </GenericModal>
    </div>
  );
}
