import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import HeaderMenu from "./HeaderMenu";

function Header({ email, onSignOut }) {

  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);

  function handleDisplayMenu() {  
    isMenuDisplayed ? setIsMenuDisplayed(false) : setIsMenuDisplayed(true);
  }

  return (
    <header className="header">
      <Link className="header__logo" to="/" />
      <Routes>
        <Route
          exact path="/"
          element={
            <>
              <HeaderMenu 
                isMenuDisplayed={isMenuDisplayed}
                email={email}
                onSignOut={onSignOut}
              />
              <button
                className={`header__button-menu ${isMenuDisplayed ? "header__button-menu_close" : ""}`}
                onClick={handleDisplayMenu}
              />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">Регистрация</Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">Войти</Link>
          }
        />
      </Routes>

    </header >
  );
}

export default Header;