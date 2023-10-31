import './Promo.css';
import promoLogo from '../../images/logo-landing.svg'

function Promo() {
  return (
    <section className="promo main__promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__image" src={promoLogo} alt="абстрактная картинка баннера" />
    </section>
  );
}

export default Promo;