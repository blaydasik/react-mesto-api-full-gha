function HeaderMenu({ isMenuDisplayed, email, onSignOut }) {

  return (
    <div className={`header__menu ${isMenuDisplayed ? "header__menu_above" : ""}`}>
      <p className="header__email">{email}</p>
      <button
        className="header__button-exit"
        onClick={onSignOut}>
        Выйти</button>
    </div>
  );
}

export default HeaderMenu;