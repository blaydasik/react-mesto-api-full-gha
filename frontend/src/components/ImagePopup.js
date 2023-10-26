function ImagePopup(props) {
  return (
    <div className={`popup popup_type_picture-view ${props.isOpen ? "popup_opened" : ""}`}>
      <figure className="popup__figure">
        <button className="popup__button-close" name="popup__button-close" aria-label='button-close' 
          type="button" onClick={props.onClose}/>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__image-title">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;