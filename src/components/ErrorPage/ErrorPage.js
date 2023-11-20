import { Link, useNavigate } from 'react-router-dom';
import './ErrorPage.css'

function ErrorPage({status, message}) {

  const navigate = useNavigate();

  function handleBackLinkClick(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <main className="error-screen">
      <section className="error-screen__content">
        <h1 className="error-screen__status">{status}</h1>
        <p className="error-screen__message">{message}</p>
        <Link className="error-screen__link" to="#" onClick={handleBackLinkClick}>Назад</Link>
      </section>
    </main>
  );
}

export default ErrorPage;
