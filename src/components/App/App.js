import "./App.css";
import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Movies from "../Movies/Movies";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import SavedMovies from "../SavedMovies/SavedMovies";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProfilePage from "../ProfilePage/ProfilePage";


const moviesBaseUrl = 'https://api.nomoreparties.co';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [movies, setMovies] = useState(null);
  const [userMovies, setUserMovies] = useState(null);

  const [moviesError, setMoviesError] = useState(false);
  const [userMoviesError, setUserMoviesError] = useState(false);

  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const [userUpdateError, setUserUpdateError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      setCurrentUser(null);
      return;
    }

    mainApi.getUserInfo()
      .then(data => {
        console.log(`Got user data: `, data);
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
      });
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.getUserInfoForToken(token)
        .then(info => {
          console.log(`Got user data (auth): `, info);
          if (!info.email) {
            return;
          }

          setLoggedIn(true);
          navigate('/movies');
        })
        .catch(err => {
          console.log(`Ошибка ${err}`);
        });
    }
  }, []);

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

  function handleLogin(email, password) {
    setLoginError(null);
    console.log('Login with ', email, password)
    mainApi.signin(email, password)
      .then(data => {
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        setLoginError(err);
      })
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('moviesState');
    setMovies(null);
    setUserMovies(null);
    setLoggedIn(false);
    navigate('/');
  }

  function handleRegister(name, email, password) {
    setRegisterError(null);
    mainApi.signup(name, email, password)
      .then(res => {
        console.log(`Registration succeeded: `, res);
        return mainApi.signin(email, password)
      })
      .then(res => {
        console.log(`Login succeeded: `, res);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        setRegisterError(err);
      })
  }

  function handleUserInfoUpdate(name, email) {
    setUserUpdateError(null);
    mainApi.updateUserInfo({name, email})
      .then(data => {
        console.log(`User update succeeded: `, data);
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        setUserUpdateError(err);
      });
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
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={(
              <>
                <Header loggedIn={loggedIn}/>
                <Main />
                <Footer />
              </>
            )} />
            <Route path="/movies" element={<ProtectedRoute loggedIn={loggedIn} element={() => (
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
            )} />}/>
            <Route path="/saved-movies" element={<ProtectedRoute loggedIn={loggedIn} element={() => (
              <>
                <Header loggedIn={loggedIn}/>
                <SavedMovies 
                  userMovies={userMovies} 
                  onLoad={handleSavedMoviesLoad} 
                  onUserMovieDelete={handleUserMovieDelete}
                  error={userMoviesError} />
                <Footer />
              </>
            )} />}/>

            <Route path="/profile" element={
                <ProtectedRoute 
                  element={ProfilePage}
                  loggedIn={loggedIn} 
                  onUserInfoUpdate={handleUserInfoUpdate} 
                  onLogout={handleLogout} 
                  error={userUpdateError} />
            }/>
            <Route path="/signin" element={(
              <Login onLogin={handleLogin} error={loginError}/>
            )}/>
            <Route path="/signup" element={(
              <Register onRegister={handleRegister} error={registerError}/>
            )}/>
            <Route path="*" element={(
              <PageNotFound />
            )} />
          </Routes>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
