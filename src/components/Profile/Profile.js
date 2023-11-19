import { useState } from 'react';
import './Profile.css'

function Profile({name}) {

  const [editMode, setEditMode] = useState(false);

  function handleEdit() {
    setEditMode(true);
  }

  function handleSave() {
    setEditMode(false);
  }

  return (
    <main className="profile">
      <section className="profile-content profile__content">
        <form className="profile-form profile-content__form">
        <h1 className="profile-form__title">{`Привет, ${name}!`}</h1>
          <fieldset className="profile-form__fieldset">
            <label className={`profile-form__field ${editMode ? "profile-form__field_mode_edit" : ""}`}>
              <span className="profile-form__label">Имя</span>
              <input className="profile-form__input" id="name-input" type="text" name="name" placeholder="адрес электронной почты" minLength="2" maxLength="100" required value={name} />
              <span className="profile-form-error profile-form__input-error profile-form__input-error_el_name-input"></span>
            </label>
            <hr className="profile-form__splitter" />
            <label className={`profile-form__field ${editMode ? "profile-form__field_mode_edit" : ""}`}>
              <span className="profile-form__label">E-mail</span>
              <input 
                className="profile-form__input" 
                id="email-input" name="email"
                type="email" 
                placeholder="адрес электронной почты" 
                minLength="3" maxLength="100" required 
                value="pochta@yandex.ru" />
              <span 
                className={`profile-form-error profile-form__input-error profile-form__input-error_el_email-input ${editMode ? "profile-form-error_active" : ""}`}
              >Неправильная почта</span>
            </label>
          </fieldset>
          <div className={`profile-form__container ${editMode ? "profile-form__container_hidden" : ""}`}>
            <button className="profile-form__link-btn" type="button" onClick={handleEdit}>Редактировать</button>
            <button className="profile-form__link-btn profile-form__link-btn_color_red" type="button">Выйти из аккаунта</button>
          </div>
          <div className={`profile-form__container ${editMode ? "" : "profile-form__container_hidden"}`}>
            <span 
              className="profile-form-error profile-form__submit-error profile-form-error_active"
            >При обновлении профиля произошла ошибка.</span>
            <button className="profile-form__submit-btn" type="submit" onClick={handleSave}>Сохранить</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Profile;
