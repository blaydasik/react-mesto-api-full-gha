import { useFormAndValidation } from "../hooks/useForm"

import React from "react";

function Account({ name, title, onSubmit, textOnButton, children, withText, isSuccess, isOpen }) {

  //подключим хук для валидации формы
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  //очистка полей формы при удачном запросе
  React.useEffect(() => {
    if (isSuccess) resetForm();
  }, [isSuccess, resetForm])

  //обработчик submit
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values);
  }

  return (

    <div className="account">
      <form className={`account__form account__form_type_${name}`}
        name={`account__form_type_${name}`}
        onSubmit={handleSubmit}>
        <h2 className={`account__title account__title_type_${name}`}>{title}</h2>
        <fieldset className="account__fieldset">
          <label className="account__label-field">
            <input className="account__input account__input_type_email"
              id="input_type_email"
              placeholder="Email"
              type="email"
              name="email"
              value={values['email'] || ''}
              onChange={handleChange}
              required
            />
            <span className={`account__error account__error_type_email ${(!isValid) ? "account__error_visible" : ""}`}
              id="input_type_email-error">{errors['email'] || ''}</span>
            <input className="account__input account__input_type_password"
              id="input_type_password"
              placeholder="Пароль"
              type="password"
              minLength="6"
              maxLength="16"
              name="password"
              value={values['password'] || ''}
              onChange={handleChange}
              required
            />
            <span className={`account__error account__error_type_password  ${(!isValid) ? "account__error_visible" : ""}`} 
              id="input_type_password-error">{errors['password'] || ''}</span>
          </label>
          <button
            className={`account__button-submit ${withText ? "account__button-submit_type_with-text" : ""}`}
            id={`account __button-${name}`}
            type="submit"
            disabled={isValid ? "" : "disabled"}>
            {textOnButton}
          </button>
        </fieldset>
      </form>
      {children}
    </div>
  );
}

export default Account;