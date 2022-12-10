function PopupWithForm(props){
    return(
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button className='popup__close-button' type='button' onClick={props.onClose}></button>
                <h2 className='popup__title'>{props.title}</h2>
                <form className='popup__form popup__info' name={`popup-${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className='popup__button' type='submit'>{props.textButton}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;