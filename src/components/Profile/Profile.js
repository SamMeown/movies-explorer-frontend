import { useContext, useEffect, useState } from 'react';
import './Profile.css'
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/form';

function Profile({onLogout, onUserInfoUpdate, error}) {

  const currentUser = useContext(CurrentUserContext);
  const [editMode, setEditMode] = useState(false);

  const {values, errors, isValid, handleChange, resetForm} = useFormWithValidation(
    {
      name: currentUser.name,
      email: currentUser.email
    }
  );

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setEditMode(false);
    }
  }, [currentUser]);

  function handleUserInfoUpdate(evt) {
    evt.preventDefault();

    const {name, email} = values;
    if (!name || !email) {
      return;
    }

    onUserInfoUpdate(name, email);
  }

  function handleEdit() {
    setEditMode(true);
  }

  return (
    <main className="profile">
      <section className="profile-content profile__content">
        <form className="profile-form profile-content__form">
        <h1 className="profile-form__title">{`Привет, ${currentUser.name}!`}</h1>
          <fieldset className="profile-form__fieldset">
            <label className={`profile-form__field ${editMode ? "profile-form__field_mode_edit" : ""}`}>
              <span className="profile-form__label">Имя</span>
              <input 
                className={`profile-form__input ${errors.name ? "profile-form__input_type_error" : ""}`} 
                id="name-input" type="text" name="name" 
                placeholder="адрес электронной почты" 
                minLength="2" maxLength="100" required 
                readOnly={!editMode}
                value={values.name} onChange={handleChange}/>
              <span 
                className={`profile-form-error profile-form__input-error profile-form__input-error_el_name-input ${(errors.name && editMode) ? "profile-form-error_active" : ""}`}
              >{errors.name}</span>
            </label>
            <label className={`profile-form__field ${editMode ? "profile-form__field_mode_edit" : ""}`}>
              <span className="profile-form__label">E-mail</span>
              <input 
                className={`profile-form__input ${errors.email ? "profile-form__input_type_error" : ""}`} 
                id="email-input" name="email"
                type="email" 
                placeholder="адрес электронной почты" 
                minLength="3" maxLength="100" required 
                readOnly={!editMode}
                value={values.email} onChange={handleChange} />
              <span 
                className={`profile-form-error profile-form__input-error profile-form__input-error_el_email-input ${(errors.email && editMode) ? "profile-form-error_active" : ""}`}
              >{errors.email}</span>
            </label>
          </fieldset>
          <div className={`profile-form__container ${editMode ? "profile-form__container_hidden" : ""}`}>
            <button className="profile-form__link-btn" type="button" onClick={handleEdit}>Редактировать</button>
            <button className="profile-form__link-btn profile-form__link-btn_color_red" type="button" onClick={onLogout}>Выйти из аккаунта</button>
          </div>
          <div className={`profile-form__container ${editMode ? "" : "profile-form__container_hidden"}`}>
            <span 
              className={`profile-form-error profile-form__submit-error ${error ? "profile-form-error_active" : ""}`}
            >{error && `При обновлении профиля произошла ошибка.`}</span>
            <button className="profile-form__submit-btn" type="submit" disabled={!isValid} onClick={handleUserInfoUpdate}>Сохранить</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Profile;
