function ImagePopup(props){
    return(
        <div className={`popup popup_photo ${Object.keys(props.card).length ? 'popup_opened' : ''}`}>
            <div className="popup__case">
                <button className="popup__close-button popup__close-button-photo" aria-label="Close" type="button" onClick={props.onClose}></button>
                <img className="popup__image" src={`${props.card.link}`} alt={props.card.name}/>
                <p className="popup__description">{props.card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;