import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onConfirmDelete(props.card);
  }

  //подпишемся на контекст текущего пользователя
  const currentUser = React.useContext(CurrentUserContext).currentUser;

  //определим, является ли текущий пользователь владельцем карточки
  const isOwn = props.card.owner === currentUser._id;

  //определим лайкнута ли карточка текущим пользователем
  const isLiked = props.card.likes.some(user => user === currentUser._id);
  const cardLikeButtonClassName = `card__button-like ${isLiked ? "card__button-like_active" : ""}`;

  return (
    <article className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <h2 className="card__title">{props.card.name}</h2>
      <div className="card__like-container">
        <button className={cardLikeButtonClassName} name="card__like-button" aria-label='button-like' type="button" onClick={handleLikeClick} />
        <span className="card__likes-counter">{props.card.likes.length}</span>
      </div>
      {isOwn ? <button className="card__button-delete" name="card__like-button-delete" aria-label='button-delete'
        type="button" onClick={handleDeleteClick} /> : ""}
    </article>
  );
}

export default Card;
