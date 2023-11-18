import { Link } from 'react-router-dom';
import './MainWithForm.css'
import logo from '../../images/logo.svg';


function MainWithForm({children}) {
  return (
    <main className="form-screen">
      <section className="form-content form-screen__content">
        <Link className="logo form-content__logo" to="/"><img className="logo__image" src={logo} alt="Лого" /></Link>
        <form className="form form-content__form" name="form-screen-form">
          <h1 className="form__title">Добро пожаловать!</h1>
          <fieldset className="form__fieldset">
            <label className="form__field">
              <span className="form__label">Имя</span>
              <input className="form__input" id="name-input" type="text" name="name" placeholder="ваше имя" minLength="2" maxLength="80" required value="Виталий"/>
              <span className="form-error form__input-error form__input-error_el_name-input"></span>
            </label>
            <label className="form__field">
              <span className="form__label">E-mail</span>
              <input className="form__input" id="email-input" type="email" name="email" placeholder="адрес электронной почты" minLength="3" maxLength="100" required value="pochta@yandex.ru"/>
              <span className="form-error form__input-error form__input-error_el_email-input"></span>
            </label>
            <label className="form__field">
              <span className="form__label">Пароль</span>
              <input className="form__input form__input_type_error" id="password-input" type="password" name="password" placeholder="адрес электронной почты" minLength="6" maxLength="30" required value="somepass"/>
              <span className="form-error form-error_active form__input-error form__input-error_el_password-input">Что-то пошло не так...</span>
            </label>
          </fieldset>
          <span className="form-error form__submit-error">Вы ввели неправильный логин или пароль.</span>
          <button className="form__submit-btn" type="submit">Зарегистрироваться</button>
          <div className="form__link-container">
            <span className="form__link-label">Уже зарегистрированы?</span><Link className="form__link" to="/signup">Войти</Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default MainWithForm;
