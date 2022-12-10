import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import { useState, useEffect } from 'react';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import * as auth from '../utils/auth.js';
import InfoToolTip from './InfoToolTip.js';
import successInfotooltipImage from '../images/yes.svg';
import failInfotooltipImage from '../images/no.svg';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoMessagePopupOpen, setIsInfoMessagePopupOpen] = useState(false);
    const [resultMessage, setResultMessage] = useState({ text: '', image: '' });
    const [email, setEmail] = useState('');
    const history = useHistory();
    const checkToken = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
                .then((res) => {
                    if (res) {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                        history.push('/');
                    }
                })
                .catch((err) => {
                    setLoggedIn(false);
                    console.log(`Переданный токен некорректен: ${err}`);
                });
        }
    }
    const handleInfoMessage = () => {
        setIsInfoMessagePopupOpen(true)
    }
    const handleLogin = (userEmail, userPassword, resetLoginForm) => {
        if (!userEmail || !userPassword) {
            return;
        }
        auth
            .authorize(userEmail, userPassword)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("jwt", data.token);
                    setLoggedIn(true);
                    history.push("/home");
                    resetLoginForm();
                }
            })
            .catch((err) => {
                setResultMessage({
                    text: "Что-то пошло не так! Попробуйте ещё раз.",
                    image: failInfotooltipImage,
                });
                setIsInfoMessagePopupOpen(true);
                console.log(err);
            });
    };
    const handleRegister = (userEmail, userPassword) => {
        auth
            .register(userPassword, userEmail)
            .then((res) => {
                setResultMessage({
                    text: "Вы успешно зарегистрировались!",
                    image: successInfotooltipImage,
                });
                history.push("/sign-in");
                console.log("Успех регистрации", res);
            })
            .catch((err) => {
                setResultMessage({
                    text: "Что-то пошло не так!",
                    image: failInfotooltipImage,
                });
                console.log("Ошибка регистрации", err);
            })
            .finally(() => {
                setIsInfoMessagePopupOpen(true);
            });
    };
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        history.push("/sign-in");
        setLoggedIn(false);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopup() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({})
        setIsInfoMessagePopupOpen(false);
    }

    function handleUpdateAvatar(e) {
        api.addNewAvatar(e)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopup();
            })
            .catch((res) => {
                console.log(res);
            })
    }

    function handleUpdateUser(e) {
        api.setUserInfo(e.name, e.about)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopup();
            })
            .catch((res) => {
                console.log(res);
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((res) => {
                console.log(res);
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((res) => {
                console.log(res);
            })
    }

    function handleAddPlaceSubmit(name, link) {
        api.addNewCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopup();
            })
            .catch((res) => {
                console.log(res);
            })
    }

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getCards()])
                .then(([userData, cardsInfo]) => {
                    setCurrentUser(userData);
                    setCards(cardsInfo);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn]);

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Header email={email} handleLogout={handleLogout} />
                <Switch>
                    <ProtectedRoute
                        exact path='/'
                        loggedIn={loggedIn}
                        component={Main}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        cards={cards}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Route path='/sign-in'>
                        <Login handleLogin={handleLogin} />
                    </Route>
                    <Route path='/sign-up'>
                        <Register
                            handleRegister={handleRegister}
                            onSucess={handleInfoMessage}
                            updateMessage={setResultMessage}
                        />
                    </Route>
                    <Route>
                        {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
                    </Route>
                </Switch>

                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopup} onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopup} onUpdateAvatar={handleUpdateAvatar} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopup} onAddPlace={handleAddPlaceSubmit} />

                <ImagePopup card={selectedCard} onClose={closeAllPopup} />

                <InfoToolTip isOpen={isInfoMessagePopupOpen} onClose={closeAllPopup} resultMessage={resultMessage} />

                <PopupWithForm name='delete' title='Вы уверены?' textButton='Да' />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
