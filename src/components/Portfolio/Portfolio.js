import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio main__portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a className="portfolio__link" href="/">
            <span className="portfolio__name">Статичный сайт</span><span className="portfolio__arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="/">
            <span className="portfolio__name">Адаптивный сайт</span><span className="portfolio__arrow">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="/">
            <span className="portfolio__name">Одностраничное приложение</span><span className="portfolio__arrow">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;