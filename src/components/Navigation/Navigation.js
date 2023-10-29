import { Link, NavLink } from 'react-router-dom';
import accountIcon from '../../images/account-icon.svg'
import './Navigation.css';

function Navigation() {
  return (
  <>
    <nav className="header__menu-unsigned header__navigation">
      <Link className="header__menu-link header__menu-link_alignment_end" to="/signup">Регистрация</Link>
      <Link className="header__menu-link header__menu-link_type_button header__menu-link_alignment_end" to="/signin">Войти</Link>
    </nav>
    <nav className="header__menu header__navigation header__navigation_visible">
      <NavLink 
        className={
          ({isActive}) => `header__menu-link header__main-link header__menu-link_size_large ${isActive ? "header__menu-link_active": ""}`
        }
        to="/"
      >Главная</NavLink>
      <NavLink 
        className={
          ({isActive}) => `header__menu-link header__menu-link_size_large ${isActive ? "header__menu-link_active": ""}`
        }
        to="/movies"
      >Фильмы</NavLink>
      <NavLink 
        className={
          ({isActive}) => `header__menu-link header__menu-link_size_large ${isActive ? "header__menu-link_active": ""}`
        }
        to="/saved-movies"
      >Сохраненные фильмы</NavLink>
      <Link 
        className="header__menu-link header__menu-link_size_large header__menu-link_type_icon-button header__menu-link_alignment_end"
        to="/profile"
      ><span>Аккаунт</span><img src={accountIcon} alt="иконка аккаунта" /></Link>
    </nav>
  </>
  );
}

export default Navigation;