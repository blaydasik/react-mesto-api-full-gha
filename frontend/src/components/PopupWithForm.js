import React from "react";

function PopupWithForm({ isOpen, onClose, name, title, textOnButton, children, onSubmit, isValid }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__button-close" name="popup__button-close"
          aria-label='button-close' type="button" onClick={onClose} />
        <form className={`popup__form popup__form_type_${name}`}
          name={`popup__form_type_${name}`}
          onSubmit={onSubmit}
        >
          <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
          <fieldset className="popup__fieldset">
            {children}
            <button
              className="popup__button-save"
              id={`popup__button-${name}`}
              type="submit"
              disabled={isValid ? "" : "disabled"}>
              {textOnButton}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;