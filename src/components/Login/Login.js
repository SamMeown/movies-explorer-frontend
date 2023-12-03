import './Login.css'
import MainWithForm from '../MainWithForm/MainWithForm'

function Login({onLogin}) {

  function handleLogin(evt) {
    evt.preventDefault();
    onLogin();
  }

  return (
    <MainWithForm 
      title="Рады видеть!"
      buttonTitle="Войти"
      linkLabel="Ещё не зарегистрированы?"
      linkText="Регистрация"
      linkRef="/signup"
      onSubmit={handleLogin}
    >
      <label className="form__field">
        <span className="form__label">E-mail</span>
        <input className="form__input" id="email-input" type="email" name="email" placeholder="адрес электронной почты" minLength="3" maxLength="100" required value="pochta@yandex.ru"/>
        <span className="form-error form__input-error form__input-error_el_email-input"></span>
      </label>
      <label className="form__field">
        <span className="form__label">Пароль</span>
        <input className="form__input" id="password-input" type="password" name="password" placeholder="пароль (от 6 символов)" minLength="6" maxLength="30" required value="123"/>
        <span className="form-error form__input-error form__input-error_el_password-input"></span>
      </label>
    </MainWithForm>
  );
}

export default Login;
