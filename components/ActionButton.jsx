import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const ActionButton = ({ onUpdate, onDelete, id, hovered }) => {
  const visibilityClass = hovered ? "visible" : "invisible";
  const deleteButton = onDelete ? (
    // <Button
    //   variant="btn btn-outline-danger"
    //   className={visibilityClass}
    //   onClick={() => onDelete(id)}
    // >
    //   Delete
    // </Button>
    <FontAwesomeIcon
      icon={faTrashAlt}
      className={`hover:text-red-600 text-gray-700 text-2xl ${visibilityClass}`}
      onClick={() => onDelete(id)}
    />
  ) : null;
  const updateButton = onUpdate ? (
    // <Button
    //   variant="btn btn-outline-light"
    //   className={visibilityClass}
    //   onClick={() => onUpdate(id)}
    // >
    //   Edit
    // </Button>
    <FontAwesomeIcon
      icon={faEdit}
      className={`hover:text-green-600 text-gray-700 text-2xl ${visibilityClass}`}
      onClick={() => onUpdate(id)}
    />
  ) : null;

  return (
    <div>
      {updateButton} {deleteButton}
    </div>
  );
};

export default ActionButton;
