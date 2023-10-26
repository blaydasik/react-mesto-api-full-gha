import PopupWithForm from './PopupWithForm';
import React from "react";
import { useFormAndValidation } from "../hooks/useForm";

function AddPlacePopup(props) {

  //подключим хук для валидации формы
  const { values, setValues, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  //обработчик
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(values);
  }

  //очистка инпутов при открытии
  React.useEffect(() => {
    setValues({});
    resetForm();
  }, [props.isOpen, setValues, resetForm]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое фото"
      textOnButton={props.isLoading ? 'Создание...' : 'Создать'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >

      <label className="popup__label-field">
        <input
          className="popup__input popup__input_type_title"
          id="input_type_title"
          placeholder="Название"
          type="text"
          minLength="2"
          maxLength="30"
          name="name"
          value={values['name'] || ''}
          onChange={handleChange}
          required />
        <span className={`popup__error popup__error_type_title  ${(!isValid && props.isOpen) ? "popup__error_visible" : ""}`}
          id="input_type_title-error">{errors['name'] || ''}</span>
        <input className="popup__input popup__input_type_link"
          id="input_type_link"
          placeholder="Ссылка на картинку"
          type="url"
          name="link"
          value={values['link'] || ''}
          onChange={handleChange}
          required />
        <span className={`popup__error popup__error_type_link ${(!isValid && props.isOpen) ? "popup__error_visible" : ""}`}
          id="input_type_link-error">{errors['link'] || ''}</span>
      </label>

    </PopupWithForm>
  )
}

export default AddPlacePopup;
