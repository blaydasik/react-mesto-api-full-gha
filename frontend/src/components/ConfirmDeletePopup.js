import PopupWithForm from './PopupWithForm';
import React from "react";

function ConfirmDeletePopup(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirmDelete(props.card);
  }

  return (
    <PopupWithForm
      name="confirm-delete"
      title="Вы уверены?"
      textOnButton="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={true}
    />
  )
}

export default ConfirmDeletePopup;