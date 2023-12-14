import { Link } from 'react-router-dom';
import './MainWithForm.css'
import logo from '../../images/logo.svg';


function MainWithForm({title, buttonTitle, linkLabel, linkText, linkRef, children, onSubmit}) {
  return (
    <main className="form-screen">
      <section className="form-content form-screen__content">
        <Link className="logo form-content__logo" to="/"><img className="logo__image" src={logo} alt="Лого" /></Link>
        <form className="form form-content__form" name="form-screen-form" onSubmit={onSubmit}>
          <h1 className="form__title">{title}</h1>
          <fieldset className="form__fieldset">
            {children}
          </fieldset>
          <span className="form-error form__submit-error">Вы ввели неправильный логин или пароль.</span>
          <button className="form__submit-btn" type="submit">{buttonTitle}</button>
          <div className="form__link-container">
            <span className="form__link-label">{linkLabel}</span><Link className="form__link" to={linkRef}>{linkText}</Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default MainWithForm;
