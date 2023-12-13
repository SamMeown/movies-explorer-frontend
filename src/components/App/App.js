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


const moviesBaseUrl = 'https://api.nomoreparties.co';

function App() {

  const [loggedIn, setLoggedIn] = useState(true);

  const [movies, setMovies] = useState(null);
  const [userMovies, setUserMovies] = useState(null);

  const [moviesError, setMoviesError] = useState(false);
  const [userMoviesError, setUserMoviesError] = useState(false);


  const navigate = useNavigate();

  function addMovie(movie) {
    return mainApi.addMovie(userMovieFromMovie(movie))
      .then(userMovie => {
        if (userMovies) {
          setUserMovies([...userMovies, userMovie]);
        } else {
          getUserMovies();
        }
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }

  function deleteUserMovie(userMovieId) {
    return mainApi.deleteMovie(userMovieId)
      .then(data => {
        if (userMovies) {
          setUserMovies(state => {
            return state.filter(c => c._id !== userMovieId);
          });
        } else {
          getUserMovies();
        }
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

  function handleMovieLike(movie, userMovie) {
    if (userMovie) {
      deleteUserMovie(userMovie._id);
    } else {
      addMovie(movie);
    }
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
    setMoviesError(false);
    return moviesApi.getMovies()
      .then((data) => {
        setMovies(data);
        setMoviesError(false);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        setMoviesError(true);
      });
  }

  function getUserMovies() {
    setUserMoviesError(false);
    return mainApi.getMovies()
      .then((data) => {
        setUserMovies(data);
        setUserMoviesError(false);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        setUserMoviesError(true);
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
                onSearch={handleSearch}
                error={moviesError || userMoviesError} />
              <Footer />
            </>
          )}/>
          <Route path="/saved-movies" element={(
            <>
              <Header loggedIn={loggedIn}/>
              <SavedMovies 
                userMovies={userMovies} 
                onLoad={handleSavedMoviesLoad} 
                onUserMovieDelete={handleUserMovieDelete}
                error={userMoviesError} />
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
