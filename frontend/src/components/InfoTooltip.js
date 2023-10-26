import imageSucess from "../images/success.svg";
import imageFailed from "../images/failed.svg";

function InfoTooltip({isOpen, onClose, isSuccess, message}) {
  return (
    <div className={`popup popup_type_image-info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__button-close" name="popup__button-close" aria-label='button-close'
          type="button" onClick={onClose}/>
        <img className="popup__image-info" src={isSuccess ? imageSucess : imageFailed} alt={isSuccess ? "черная галочка в круге" : "красный крестик в круге"} />
        <h2 className="popup__title popup__title_type_info">{message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
