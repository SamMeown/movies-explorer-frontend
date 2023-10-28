import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
  <>
    <nav className="header__menu-unsigned header__navigation header__navigation_visible">
      <Link className="header__menu-link" to="/register">Регистрация</Link>
      <Link className="header__menu-link header__menu-link_type_button" to="/login">Войти</Link>
    </nav>
    <nav className="menu">

    </nav>
  </>
  );
}

export default Navigation;