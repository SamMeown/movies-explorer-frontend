import './Register.css'
import MainWithForm from '../MainWithForm/MainWithForm'
import { useFormWithValidation } from '../../hooks/form';
import { useEffect } from 'react';

function Register({onRegister, error}) {

  const {values, errors, isValid, handleChange, resetForm} = useFormWithValidation(
    {
      name: "",
      email: "",
      password: ""
    },
    {
      name: "Имя может содержать только латиницу, кириллицу, цифры, пробел и дефис",
      email: "Невалидный email"
    }
  );

  useEffect(() => {
    return () => { 
      resetForm();
    }
  }, []);

  function handleRegister(evt) {
    evt.preventDefault();

    const {name, email, password} = values;
    if (!name || !email || !password) {
      return;
    }

    onRegister(name, email, password);
  }
  return (
    <MainWithForm 
      title="Добро пожаловать!"
      buttonTitle="Зарегистрироваться"
      linkLabel="Уже зарегистрированы?"
      linkText="Войти"
      linkRef="/signin"
      onSubmit={handleRegister}
      isValid={isValid}
      error={error}
    >
      <label className="form__field">
        <span className="form__label">Имя</span>
        <input 
          className={`form__input ${errors.name ? "form__input_type_error" : ""}`} 
          id="name-input" type="text" name="name" 
          placeholder="ваше имя" 
          minLength="2" maxLength="80" required 
          pattern="[A-Za-zА-Яа-я0-9\- ]+"
          value={values.name} onChange={handleChange}
          autoFocus
        />
        <span 
          className={`form-error form__input-error form__input-error_el_name-input ${errors.name ? "form-error_active" : ""}`}
        >{errors.name}</span>
      </label>
      <label className="form__field">
        <span className="form__label">E-mail</span>
        <input 
          className={`form__input ${errors.email ? "form__input_type_error" : ""}`} 
          id="email-input" type="email" name="email" 
          placeholder="адрес электронной почты" 
          minLength="3" maxLength="100" required 
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}"
          value={values.email} onChange={handleChange}
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
          minLength="6" maxLength="30" required 
          value={values.password} onChange={handleChange}
        />
        <span 
          className={`form-error form__input-error form__input-error_el_password-input ${errors.password ? "form-error_active" : ""}`}
        >{errors.password}</span>
      </label>
    </MainWithForm>
  );
}

export default Register;
