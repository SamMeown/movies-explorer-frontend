import "./App.css";
import Header from "../Header/Header"
import Main from "../Main/Main"
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import { Route, Routes } from "react-router-dom";
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

function App() {

  const [cards, setCards] = useState(example_cards);
  const [savedCards, setSavedCards] = useState(example_cards);

  function handleCardLike(card) {
    card.isLiked = !card.isLiked;
    setCards(state => {
      return state.map(c => c.id === card.id ? card : c)
    });
  }

  function handleCardDelete(card) {
    setSavedCards(state => state.filter(c => c.id !== card.id));
  }

  function handleLoadMoreMovies() {
    // TODO
  }

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path="/" element={(
            <>
              <Header />
              <Main />
              <Footer />
            </>
          )} />
          <Route path="/movies" element={(
            <>
              <Header />
              <Movies 
                cards={cards}
                onCardLike={handleCardLike} 
                onLoadMore={handleLoadMoreMovies} 
                inProgress={false}/>
              <Footer />
            </>
          )}/>
          <Route path="/saved-movies" element={(
            <>
              <Header />
              <Movies 
                cards={savedCards}
                onCardDelete={handleCardDelete}  
                inProgress={false}/>
              <Footer />
            </>
          )}/>
          <Route path="/signin" element={(
            <Login />
          )}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
