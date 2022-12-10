import Card from './Card.js';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <img className="profile__photo" src={currentUser.avatar} alt="Фото профиля" />
                </div>
                <div className="profile__info">
                    <div className="profile__infos">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                        <Card key={card._id}
                              card={card}
                              onCardClick={props.onCardClick}
                              onCardLike={props.onCardLike}
                              onCardDelete={props.onCardDelete}/>
                    )
                )}
            </section>
        </main>
    )
}

export default Main;