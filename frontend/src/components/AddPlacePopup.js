import React, { createRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const name = createRef();
    const link = createRef();

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(name.current.value, link.current.value);
    }

    useEffect(() => {
        name.current.value = '';
        link.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm title='Новое место' name='add' textButton="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input className="popup__input popup__input_title" placeholder="Название " name="name" id="title" type="text" minLength="2" ref={name} maxLength="30" required />
            <span className="popup__error title-error"></span>
            <input className="popup__input popup__input_url" placeholder="Ссылка на картинку " name="link" ref={link} id="url" type="url" required />
            <span className="popup__error url-error"></span>
        </PopupWithForm>
    )

}

export default AddPlacePopup;