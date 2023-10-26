import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login.js';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import workingApi from '../utils/api';
import * as auth from '../utils/auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  //переменные состояния
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  //определяет успешно ли прошел процесс авторизации/регистрации
  const [isSuccess, setIsSucess] = useState(false);

  //переменная, отслеживающая состояние открытости любого из попапов
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmDeletePopupOpen || isImagePopupOpen || isInfoTooltipPopupOpen;

  const navigate = useNavigate();

  //обработчики открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmDeleteClick(card) {
    setSelectedCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
  }

  //обработчик закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  //обработчик нажатия на картинку
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  //обработчик ошибок в запросе
  function proceedError(err) {
    alert(`Ошибка. Запрос не выполнен: ${err}`);
  }

  //обработчик изменения профиля
  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    workingApi.setNewUserInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(proceedError)
      .finally(() => setIsLoading(false));
  }

  //обработчик изменения аватара
  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    workingApi.updateUserAvatar(avatarLink)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(proceedError)
      .finally(() => setIsLoading(false));
  }

  //обработчик лайка
  function handleCardLike(card) {
    //проверяем, есть ли уже лайк
    const isLiked = card.likes.some(user => (user === currentUser._id));
    //отправим запрос на постановку/удаление лайка
    workingApi.proceedLike(card._id, isLiked)
      .then((newCard) => {
        //обновим массив карточек
        setCards((state) => state.map((cardItem) => cardItem._id === card._id ? newCard : cardItem));
      })
      .catch(proceedError);
  }

  //обработчик удаления карточки
  function handleCardDelete(card) {
    workingApi.deleteCard(card._id)
      .then((filteredCards) => {
        //обновим массив карточек
        setCards((state) => state.filter((cardItem) => cardItem._id !== card._id));
        closeAllPopups();
      })
      .catch(proceedError);
  }

  //обработчик добавления карточки
  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    workingApi.addNewCard(cardData)
      .then((newCard) => {
        //обновим массив карточек
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(proceedError)
      .finally(() => setIsLoading(false));
  }

  //обработчик залогинивания
  function onLogin(account) {
    setIsLoading(true);
    auth
      .login(account)
      .then((userData) => {
        //проверим, что токен получен
        if (userData.token) {
          setLoggedIn(true);
          //при успешной авторизации переходим на главную страницу
          navigate("/");
          setIsSucess(true);
        }
      })
      .catch((err) => {
        setIsSucess(false);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        proceedError(err);
        handleInfoTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //обработчик регистрации
  function handleRegistration(account) {
    setIsLoading(true);
    auth
      .register(account)
      .then((userData) => {
        setIsSucess(true);
        setMessage("Вы успешно зарегистрировались!");
        //при успешной регистрации переходим на страницу авторизации
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsSucess(false);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        proceedError(err);
      })
      .finally(() => {
        setIsLoading(false);
        handleInfoTooltip();
      });
  }

  //обработчик выхода из аккаунта
  function onSignOut() {
    auth
      .logout()
      .then((answer) => {
        setIsSucess(true);
        setMessage(answer.message);
        //перейдем на страницу входа
        navigate("/sign-in");
        setLoggedIn(false);
        setEmail("");
      })
      .catch((err) => {
        proceedError(err);
        setIsSucess(false);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        handleInfoTooltip();
      });
  }

  //эффект при загрузке страницы для проверки наличия валидной куки
  useEffect(() => {
    auth
      .CheckCookies()
      .then((userData) => {
        if (userData) {//авторизуем пользователя
          setEmail(userData.email);
          setLoggedIn(true);
          //при успешной авторизации переходим на главную страницу
          navigate("/");
        }
      })
      .catch(() => {
        setLoggedIn(false);
        navigate("/sign-in");
      })

  }, [loggedIn])

  //эффект при монтировании компонента
  useEffect(() => {
    if (loggedIn) { //исключим лишние запросы, если пользователь не авторизован
      //загружаем информацию о пользователе
      workingApi.downloadUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(proceedError);
      //загружаем массив карточек
      workingApi.downloadCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch(proceedError);
    }
  }, [loggedIn]);

  //навешивание обработчика на нажатие клавиши Escape
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      //навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      //удаляем при закрытии
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])//отслеживаем открытия и закрытия попапов

  return (
    <div className="page">

      <CurrentUserContext.Provider value={{ currentUser: currentUser, loggedIn: loggedIn }}>

        <Header
          email={email}
          onSignOut={onSignOut}
        />

        <Routes>

          <Route
            exact path="/"
            element={
              <ProtectedRoute
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onConfirmDelete={handleConfirmDeleteClick}
                cards={cards}
                onCardLike={handleCardLike}
              />
            }
          />

          (//вход в аккаунт)
          <Route
            path="/sign-in"
            element={
              <Login
                isLoading={isLoading}
                onLogin={onLogin}
                isSuccess={isSuccess}
              />
            }
          />

          (//регистрация аккаунта)
          <Route
            path="/sign-up"
            element={
              <Register
                isLoading={isLoading}
                onRegister={handleRegistration}
                isSuccess={isSuccess}
              />
            }
          />

          (//перенаправление всех других роутов)
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />

        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
          card={selectedCard}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          message={message}
        />

      </CurrentUserContext.Provider>

    </div >
  );
}

export default App;
