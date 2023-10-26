import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useForm";


function EditProfilePopup(props) {

  //подключим хук для валидации формы
  const { values, setValues, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const currentUser = React.useContext(CurrentUserContext);

  //обработчик
  function handleSubmit(evt) {
    evt.preventDefault();
    //передаим значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({name: values.name, about: values.about});
  }

  //получим данные пользователя в управляемые компоненты
  React.useEffect(() => {
    setValues(currentUser['currentUser']);
    setIsValid(true);
  }, [currentUser, setValues, setIsValid, props.isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textOnButton={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >

      <label className="popup__label-field">
        <input className="popup__input popup__input_type_name"
          id="input_type_name"
          placeholder="Имя"
          type="text"
          minLength="2"
          maxLength="40"
          name="name"
          value={values['name'] || ''}
          onChange={handleChange}
          required
        />
        <span className={`popup__error popup__error_type_name ${(!isValid && props.isOpen) ? "popup__error_visible" : ""}`}
          id="input_type_name-error">{errors['name'] || ''}</span>
        <input className="popup__input popup__input_type_about"
          id="input_type_about"
          placeholder="О себе"
          type="text"
          minLength="2"
          maxLength="200"
          name="about"
          value={values['about'] || ''}
          onChange={handleChange}
          required
        />
        <span className={`popup__error popup__error_type_about ${(!isValid && props.isOpen) ? "popup__error_visible" : ""}`}
          id="input_type_about-error">{errors['about'] || ''}</span>
      </label>

    </PopupWithForm >
  )
}

export default EditProfilePopup;
