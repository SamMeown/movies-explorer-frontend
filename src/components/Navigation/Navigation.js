import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import accountIcon from '../../images/account-icon.svg'
import './Navigation.css';

function Navigation({loggedIn}) {

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpened(state => !state);
  }

  return (
  <>
    <nav className={`header__menu-unsigned header__navigation ${loggedIn ? "" : "header__navigation_visible"}`}>
      <Link className="header__menu-link header__menu-link_alignment_right" to="/signup">Регистрация</Link>
      <Link className="header__menu-link header__menu-link_type_button header__menu-link_alignment_right" to="/signin">Войти</Link>
    </nav>
    <nav className={`header__menu header__navigation ${loggedIn ? "header__navigation_visible" : ""}`}>
      <button className={`header__menu-btn ${isMenuOpened && 'header__menu-btn_pressed'}`} type="button" onClick={handleToggleMenu}>
        <span className="header__menu-btn-icon"></span>
      </button>
      <div 
        className={`header__menu-popup ${isMenuOpened && "header__menu-popup_opened"}`}
        onClick={evt => evt.target === evt.currentTarget && handleToggleMenu()}
      >
        <div className="header__menu-box">
          <NavLink 
            className={
              ({isActive}) => `header__menu-link header__main-link header__menu-link_size_large ${isActive ? "header__menu-link_active": ""}`
            }
            onClick={handleToggleMenu}
            to="/"
          >Главная</NavLink>
          <NavLink 
            className={
              ({isActive}) => `header__menu-link header__menu-link_size_large ${isActive ? "header__menu-link_active": ""}`
            }
            onClick={handleToggleMenu}
            to="/movies"
          >Фильмы</NavLink>
          <NavLink 
            className={
              ({isActive}) => `header__menu-link header__menu-link_size_large ${isActive ? "header__menu-link_active": ""}`
            }
            onClick={handleToggleMenu}
            to="/saved-movies"
          >Сохраненные фильмы</NavLink>
          <Link 
            className="header__menu-link header__menu-link_size_large header__menu-link_type_icon-button header__menu-link_alignment_right header__menu-link_alignment_mobile-bottom"
            onClick={handleToggleMenu}
            to="/profile"
          ><span className="header__menu-link-title">Аккаунт</span><img className="header__menu-link-icon" src={accountIcon} alt="иконка аккаунта" /></Link>
        </div>
      </div>
    </nav>
  </>
  );
}

export default Navigation;