import './AboutProject.css'
import SectionHeader from '../SectionHeader/SectionHeader';

function AboutProject() {
  return (
    <section className="about main__about">
      <SectionHeader>О проекте</SectionHeader>
      <ul className="about__items">
        <li className="about__item">
          <h2 className="about__item-title">Дипломный проект включал 5 этапов</h2>
          <p className="about__item-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about__item">
          <h2 className="about__item-title">На выполнение диплома ушло 5 недель</h2>
          <p className="about__item-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="about__graph">
        <p className="about__graph-stripe about__graph-stripe_highlighted">1 неделя</p>
        <p className="about__graph-stripe">4 недели</p>
        <p className="about__graph-legend">Back-end</p>
        <p className="about__graph-legend">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;