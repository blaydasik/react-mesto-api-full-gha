import React from "react";
import { Navigate } from "react-router-dom";

import { CurrentUserContext } from '../contexts/CurrentUserContext';

//HOC-компонент
//аргументы - компонент, который будет доступен авторизованным пользователям
//и пропсы, передававаемые внутрь
function ProtectedRoute({ component: Component, ...props }) {
  //подпишемся на контекст текущего пользователя
  const loggedIn = React.useContext(CurrentUserContext).loggedIn;
  if (loggedIn) {
    return (<Component {...props} />);
  } else {
    return (<Navigate to="/sign-in" replace/>);
  }
}

export default ProtectedRoute;