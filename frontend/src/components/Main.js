import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

  //подпишемся на контекст текущего пользователя
  const currentUser = React.useContext(CurrentUserContext).currentUser;

  return (
    <main className="content">

      <section className="profile">
        <img className="profile__picture" alt="аватар пользователя." src={currentUser.avatar} />
        <button className="profile__update-button" name="profile__update-button" aria-label="update-button"
          type="button" onClick={props.onEditAvatar} />
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" name="profile__edit-button" aria-label="edit-button"
            type="button" onClick={props.onEditProfile} />
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" name="profile__add-button" type="button" onClick={props.onAddPlace} />
      </section>

      {/*с помощью JSX итерации добавим карточки на страницу*/}
      <section className="cards">
        {props.cards.map((cardItem) => (
          <Card
            key={cardItem._id}
            card={cardItem}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onConfirmDelete={props.onConfirmDelete}
          />
        ))}
      </section>

    </main>
  );
}

export default Main;