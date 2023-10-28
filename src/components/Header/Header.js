import "./Header.css";
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation'
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header page__header">
      <Link className="logo" to="/"><img className="logo__image" src={logo} alt="Лого" /></Link>
      <Navigation />
    </div>
  );
}

export default Header;