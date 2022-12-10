import React from 'react';

function InfoToolTip({ onClose, isOpen, resultMessage }) {
    return (
        <div className={`popup popup__preview ${isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container'>
                <img className='popup__image-info' src={resultMessage.image} alt={resultMessage.image} />
                <h2 className='popup__title popup__title_message-info'>
                    {resultMessage.text}
                </h2>
                <button className='popup__close-button' type='button' onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoToolTip;