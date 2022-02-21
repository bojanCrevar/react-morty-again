import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { ActionContext } from "../context/ActionContext";
import { useSelector } from "react-redux";
import { RootState } from "../model/storeModel";

type ActionButtonProps = {
  id: number;
  hovered: boolean;
};

const ActionButton = ({ id, hovered }: ActionButtonProps) => {
  const { handleDelete: onDelete, handleUpdate: onUpdate } =
    useContext(ActionContext);

  const visibilityClass = hovered ? "visible" : "invisible";
  const deleteButton = onDelete ? (
    <FontAwesomeIcon
      icon={faTrashAlt}
      data-testid="deleteIcon"
      className={`hover:text-red-600 text-gray-700 text-2xl ${visibilityClass} hover:cursor-pointer`}
      onClick={() => onDelete(id)}
    />
  ) : null;
  const updateButton = onUpdate ? (
    <FontAwesomeIcon
      icon={faEdit}
      data-testid="editIcon"
      className={`hover:text-green-600 text-gray-700 text-2xl ${visibilityClass} hover:cursor-pointer`}
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
