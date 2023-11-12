import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState } from 'react';

let example_cards = [
  {
    id: 1,
    name: "33 слова о дизайне",
    link: require("../../images/card-33_words.png"),
    isLiked: true,
    time: "1ч42м"
  },
  {
    id: 2,
    name: "Киноальманах «100 лет дизайна»",
    link: require("../../images/card-100_years.png"),
    isLiked: true,
    time: "1ч42м"
  },
  {
    id: 3,
    name: "В погоне за Бенкси",
    link: require("../../images/card-banksy.png"),
    isLiked: true,
    time: "1ч42м"
  },
  {
    id: 4,
    name: "Баския: Взрыв реальности",
    link: require("../../images/card-explosion.png"),
    isLiked: true,
    time: "1ч42м"
  },
  {
    id: 5,
    name: "Gimme Danger: История Игги иии The Stooge и очень длинный-длинный, просто длинющий, необъятный текстище",
    link: require("../../images/card-iggy.png"),
    isLiked: true,
    time: "1ч42м"
  }
];

function MoviesCardList() {

  const [cards, setCards] = useState(example_cards);

  function handleCardLike(card) {
    card.isLiked = !card.isLiked;
    setCards(state => {
      return state.map(c => c.id === card.id ? card : c)
    });
  }

  function handleCardDelete(card) {
    setCards(state => state.filter(c => c.id !== card.id));
  }

  return (
    <section className="cards movies__cards">
      <ul className="cards__items">
        {
          cards.map(card => (<MoviesCard card={card} isLikeMode={false} onCardLike={handleCardLike} onCardDelete={handleCardDelete} key={card.id}/>))
        }
      </ul>
      <button className="movies-list__btn">Ещё</button>

    </section>
  );
}

export default MoviesCardList;


