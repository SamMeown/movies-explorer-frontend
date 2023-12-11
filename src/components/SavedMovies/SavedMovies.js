import { useEffect, useState } from 'react';
import BaseMovies from '../BaseMovies/BaseMovies';
import './SavedMovies.css'

function SavedMovies({userMovies, onLoad, onUserMovieDelete}) {

  function filterMovies(movies, {request, short}) {
    request = request.toLowerCase();
    return movies.filter(movie => {
      return (
        (!short || movie.duration <= 40)
        && (movie.nameRU.toLowerCase().includes(request)
            || movie.nameEN.toLowerCase().includes(request))
      );
    })
  }

  function cardFromMovie(movie) {

    const card = {
      id: movie._id,
      name: movie.nameRU,
      imageLink: movie.image,
      trailerLink: movie.trailerLink,
      time: `${Math.trunc(movie.duration / 60)}ч${movie.duration % 60}м`
    };

    return card;
  }

  function handleSearch({request, short}) {
    setSearchRequest({request, short})
  }

  function handleCardDelete(card) {
    const userMovie = userMovies.find(m => m._id === card.id);
    console.log(userMovie);
    onUserMovieDelete(userMovie);
  }

  const [inProgress, setInProgress] = useState(false);
  const [searchRequest, setSearchRequest] = useState({request: "", short: false});

  const [shownCards, setShownCards] = useState([]);

  useEffect(() => {
    if (!userMovies) {
      onLoad();
    }
  }, []);

  useEffect(() => {
    setInProgress(!userMovies);
  }, [userMovies]);

  useEffect(() => {
    if (!userMovies) {
      return;
    }

    setShownCards(
      filterMovies(userMovies, searchRequest).map(cardFromMovie)
    )
  }, [userMovies, searchRequest]);

  return (
    <BaseMovies 
      cards={shownCards} 
      onSearch={handleSearch} 
      inProgress={inProgress} 
      onCardDelete={handleCardDelete} />
  );
}

export default SavedMovies;