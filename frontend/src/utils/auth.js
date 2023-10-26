import { apiSettings } from './constants.js';

//универсальный метод запроса с проверкой ответа
function request(url, options) {
  return fetch(url, { ...options, ...apiSettings.options }).then(validateAnswer);
}

//метод проверки ответа сервера
function validateAnswer(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

//запрос для регистрации нового пользователя
export const register = (account) => {
  return request(`${apiSettings.link}/signup`, {
    method: "POST",
    body: JSON.stringify(account)
  });
}

//запрос для авторизации пользователя
export const login = (account) => {
  return request(`${apiSettings.link}/signin`, {
    method: "POST",
    body: JSON.stringify(account),
  });
}

//запрос для проверки куки и получения email
export const CheckCookies = () => {
  return request(`${apiSettings.link}/users/me`, {
    method: "GET",
  });
}

//запрос для удаления авторизационной куки
export const logout = () => {
  return request(`${apiSettings.link}/users/logout`, {
    method: "DELETE",
  });
}
