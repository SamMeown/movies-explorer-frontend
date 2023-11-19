import './Register.css'
import MainWithForm from '../MainWithForm/MainWithForm'

function Register() {
  return (
    <MainWithForm 
      title="Добро пожаловать!"
      buttonTitle="Зарегистрироваться"
      linkLabel="Уже зарегистрированы?"
      linkText="Войти"
    >
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
    </MainWithForm>
  );
}

export default Register;
