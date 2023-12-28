import './Login.css'
import MainWithForm from '../MainWithForm/MainWithForm'
import { useFormWithValidation } from '../../hooks/form';
import { useEffect } from 'react';

function Login({onLogin, error}) {

  const {values, errors, isValid, handleChange, resetForm} = useFormWithValidation(
    {
      email: "",
      password: ""
    },
    {
      email: "Невалидный email"
    }
  );

  useEffect(() => {
    return () => { 
      resetForm();
    }
  }, []);

  function handleLogin(evt) {
    evt.preventDefault();

    const {email, password} = values;
    if (!email || !password) {
      return;
    }

    onLogin(email, password);
  }

  return (
    <MainWithForm 
      title="Рады видеть!"
      buttonTitle="Войти"
      linkLabel="Ещё не зарегистрированы?"
      linkText="Регистрация"
      linkRef="/signup"
      onSubmit={handleLogin}
      isValid={isValid}
      error={error}
    >
      <label className="form__field">
        <span className="form__label">E-mail</span>
        <input 
          className={`form__input ${errors.email ? "form__input_type_error" : ""}`} 
          id="email-input" type="email" name="email" 
          placeholder="адрес электронной почты" 
          minLength="3" maxLength="100" required
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}"
          value={values.email} onChange={handleChange}
          autoFocus
        />
        <span 
          className={`form-error form__input-error form__input-error_el_email-input ${errors.email ? "form-error_active" : ""}`}
        >{errors.email}</span>
      </label>
      <label className="form__field">
        <span className="form__label">Пароль</span>
        <input 
          className={`form__input ${errors.password ? "form__input_type_error" : ""}`} 
          id="password-input" type="password" name="password" 
          placeholder="пароль (от 6 символов)" 
          minLength="4" maxLength="30" required 
          value={values.password} onChange={handleChange}
        />
        <span 
          className={`form-error form__input-error form__input-error_el_email-input ${errors.password ? "form-error_active" : ""}`}
        >{errors.password}</span>
      </label>
    </MainWithForm>
  );
}

export default Login;
