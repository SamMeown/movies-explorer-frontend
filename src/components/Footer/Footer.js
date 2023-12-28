import './Footer.css'

function Footer() {
  return (
    <footer className="footer page__footer">
      <p className="footer__title">Проект SamMeown х BeatFilm.</p>
      <div className="footer__bottom-container">
        <p className="footer__year">{`© ${new Date().getFullYear()}`}</p>
        <ul className="footer__link-items">
          <li className="footer__link-item">
            <a className="footer__link" href="https://beatfilmfestival.ru" target="_blank" rel="noreferrer">BeatFilm</a>
          </li>
          <li className="footer__link-item">
            <a className="footer__link" href="https://github.com/SamMeown/movies-explorer-frontend" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;