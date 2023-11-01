import './AboutMe.css'
import SectionHeader from '../SectionHeader/SectionHeader';

import photo from '../../images/photo.png'

function AboutMe() {
  return (
    <section className="about-me main__about-me">
      <SectionHeader>Студент</SectionHeader>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__title">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="about-me__link" href="/">Github</a>
        </div>
        <img className="about-me__photo" src={photo} alt="фото студента" />
      </div>
    </section>
  );
}

export default AboutMe;