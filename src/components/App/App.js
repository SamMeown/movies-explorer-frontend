import "./App.css";
import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Movies from "../Movies/Movies";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import SavedMovies from "../SavedMovies/SavedMovies";

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

const moviesBaseUrl = 'https://api.nomoreparties.co';

function App() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [cards, setCards] = useState(example_cards);
  const [savedCards, setSavedCards] = useState(example_cards);

  const [movies, setMovies] = useState(null);
  const [userMovies, setUserMovies] = useState(null);


  const navigate = useNavigate();

  function addMovie(movie) {
    return mainApi.addMovie(userMovieFromMovie(movie))
      .then(userMovie => {
        setUserMovies([...userMovies, userMovie])
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }

  function deleteMovie(movieId) {
    const userMovieId = userMovies.find(m => m.movieId === movieId)?._id;
    if (!userMovieId) {
      return;
    }

    return deleteUserMovie(userMovieId)
  }

  function deleteUserMovie(userMovieId) {
    return mainApi.deleteMovie(userMovieId)
      .then(data => {
        setUserMovies(state => {
          return state.filter(c => c._id !== userMovieId);
        });
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }

  function userMovieFromMovie(movie) {
    const {id: movieId, country, director, duration, year, description, trailerLink: trailer, nameRU, nameEN} = movie;
    return {
      movieId, country, director, duration, year, description, trailer, nameRU, nameEN,
      image: `${moviesBaseUrl}${movie.image.url}`,
      thumbnail: `${moviesBaseUrl}${movie.image.formats.thumbnail.url}`
    }
  }

  // id: movie.id,
  //     name: movie.nameRU,
  //     imageLink: `${moviesBaseUrl}${movie.image.url}`,
  //     trailerLink: movie.trailerLink,
  //     isLiked: userMovies.some(userMovie => userMovie.movieId === movie.id),
  //     time: `${Math.trunc(movie.duration / 60)}ч${movie.duration % 60}м`

  function handleMovieLike(movie, isLiked) {
    if (isLiked) {
      deleteMovie(movie.id);
    } else {
      addMovie(movie);
    }
    
    // setCards(state => {
    //   return state.map(c => c.id === card.id ? card : c)
    // });
  }

  function handleCardDelete(card) {
    setSavedCards(state => state.filter(c => c.id !== card.id));
  }

  function handleLoadMoreMovies() {
    // TODO
  }

  function handleLogin() {
    setLoggedIn(true);
    navigate('/movies');
  }

  function handleLogout() {
    setLoggedIn(false);
    navigate('/');
  }

  function getMovies() {
    return moviesApi.getMovies()
      .then(setMovies)
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }

  function getUserMovies() {
    return mainApi.getMovies()
      .then(setUserMovies)
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleSearch() {
    getMovies();
    if (!userMovies) {
      getUserMovies();
    }
  }

  function handleUserMovieDelete(userMovie) {
    deleteUserMovie(userMovie._id);
  }

  function handleSavedMoviesLoad() {
    getUserMovies();
  }

  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path="/" element={(
            <>
              <Header loggedIn={loggedIn}/>
              <Main />
              <Footer />
            </>
          )} />
          <Route path="/movies" element={(
            <>
              <Header loggedIn={loggedIn}/>
              <Movies
                movies={movies}
                userMovies={userMovies}
                onMovieLike={handleMovieLike} 
                onSearch={handleSearch} />
              <Footer />
            </>
          )}/>
          <Route path="/saved-movies" element={(
            <>
              <Header loggedIn={loggedIn}/>
              <SavedMovies 
                userMovies={userMovies} 
                onLoad={handleSavedMoviesLoad} 
                onUserMovieDelete={handleUserMovieDelete}/>
              <Footer />
            </>
          )}/>
          <Route path="/profile" element={(
            <>
              <Header loggedIn={loggedIn}/>
              <Profile name="Виталий" onLogout={handleLogout}/>
            </>
          )}/>
          <Route path="/signin" element={(
            <Login onLogin={handleLogin}/>
          )}/>
          <Route path="/signup" element={(
            <Register />
          )}/>
          <Route path="*" element={(
            <PageNotFound />
          )} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
