import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm title='Обновить аватар' name='avatar' textButton="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_url" name="link" id="urll" placeholder="Ссылка на картинку" type="url" ref={avatarRef} required />
      <span className="popup__error urll-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;