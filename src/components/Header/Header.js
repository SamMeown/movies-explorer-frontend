import "./Header.css";
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation'
import { Link } from "react-router-dom";

function Header({loggedIn}) {
  return (
    <header className="header page__header">
      <Link className="logo" to="/"><img className="logo__image" src={logo} alt="Лого" /></Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header;