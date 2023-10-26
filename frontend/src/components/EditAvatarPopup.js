import PopupWithForm from './PopupWithForm';
import React from "react";
import { useState } from 'react';

function EditAvatarPopup(props) {

  //используем реф
  const avatarRef = React.useRef();
  const errorRef = React.useRef();

  //переменная отвечающая за валидность инпутов
  const [isValid, setIsValid] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    //обновим аватар
    props.onUpdateAvatar(avatarRef.current.value);
  }

  function checkValidity(evt) {
    setIsValid(evt.target.closest('form').checkValidity());
    errorRef.current.textContent = evt.target.validationMessage;
  }

  //очистка инпута при открытии
  React.useEffect(() => {
    avatarRef.current.value = '';
    errorRef.current.textContent = '';   
    setIsValid(false);
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      textOnButton={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__label-field">

        <input
          className="popup__input popup__input_type_avatar"
          id="input_type_avatar"
          placeholder="Ссылка на аватар"
          type="url"
          name="avatar"
          ref={avatarRef}
          onChange={checkValidity}
          required
        />
        <span ref={errorRef} className={`popup__error popup__error_type_avatar ${(!isValid && props.isOpen) ? "popup__error_visible" : ""}`}
          id="input_type_avatar-error"></span>

      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;