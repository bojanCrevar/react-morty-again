import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const ActionButton = ({ onUpdate, onDelete, id, hovered }) => {
  const visibilityClass = hovered ? "visible" : "invisible";
  const deleteButton = onDelete ? (
    <FontAwesomeIcon
      icon={faTrashAlt}
      className={`hover:text-red-600 text-gray-700 text-2xl ${visibilityClass}`}
      onClick={() => onDelete(id)}
    />
  ) : null;
  const updateButton = onUpdate ? (
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
