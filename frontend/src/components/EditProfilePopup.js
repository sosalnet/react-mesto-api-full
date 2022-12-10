import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleJobChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm title='Редактировать профиль' name='edit' textButton="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_fio" placeholder="Имя " id="fio" type="text" value={name || ''} onChange={handleNameChange} minLength="2" maxLength="40" name="username" required />
      <span className="popup__error fio-error"></span>
      <input className="popup__input popup__input_job" placeholder="О себе " id="job" type="text" value={description || ''} onChange={handleJobChange} minLength="2" maxLength="200" name="description" required />
      <span className="popup__error job-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;