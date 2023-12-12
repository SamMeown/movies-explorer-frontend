import { useEffect, useState } from 'react';
import BaseMovies from '../BaseMovies/BaseMovies';
import './Movies.css'


const moviesBaseUrl = 'https://api.nomoreparties.co';

function Movies({movies, userMovies, onMovieLike, onSearch}) {
  
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
      id: movie.id,
      name: movie.nameRU,
      imageLink: `${moviesBaseUrl}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      isLiked: (userMovies ?? storedUserMovies).some(userMovie => userMovie.movieId === movie.id),
      time: `${Math.trunc(movie.duration / 60)}ч${movie.duration % 60}м`
    };

    return card;
  }

  function handleSearch({request, short}) {
    setSearchRequest({request, short})
    setIsDirtyRequest(false);
    setFilteredMovies(null);
    if (!movies) {
      setInProgress(true);
      onSearch();
      return;
    }
  }

  function handleLoadMore() {
    setNumCardsToShow(numCardsToShow + 4);
  }

  function handleCardLike(card) {
    const movie = filteredMovies.find(m => m.id === card.id);
    const userMovie = (userMovies ?? storedUserMovies).find(m => m.movieId === card.id);
    onMovieLike(movie, userMovie);
  }

  function handleRequestChanged(values) {
    setInitialSearchRequest(null);
    if (!searchRequest?.request?.length) {
      return;
    }

    if (searchRequest.request !== values.request) {
      setIsDirtyRequest(true);
      return;
    }

    if (!isDirtyRequest && searchRequest.request !== values.short){
      setSearchRequest(values);
      setFilteredMovies(null);

      if (!movies) {
        setInProgress(true);
        onSearch();
        return;
      }
    }
  }

  const [inProgress, setInProgress] = useState(false);
  const [searchRequest, setSearchRequest] = useState(null);
  const [initialSearchRequest, setInitialSearchRequest] = useState(null);

  const [isDirtyRequest, setIsDirtyRequest] = useState(true);

  const [filteredMovies, setFilteredMovies] = useState(null);

  const [storedUserMovies, setStoredUserMovies] = useState(null);

  const [shownCards, setShownCards] = useState([]);
  const [numCardsToShow, setNumCardsToShow] = useState(0);

  useEffect(() => {
    const restoredState = JSON.parse(localStorage.getItem('moviesState'));
    if (!restoredState) {
      return;
    }
    
    setSearchRequest(restoredState.searchRequest);
    setFilteredMovies(restoredState.filteredMovies);
    setStoredUserMovies(restoredState.filteredUserMovies);
    setNumCardsToShow(restoredState.numCardsToShow);

    setInitialSearchRequest(restoredState.searchRequest);
    setIsDirtyRequest(false);
    
  }, []);

  useEffect(() => {
    if (movies && userMovies) {
      setInProgress(false);
    }
  }, [movies, userMovies]);

  useEffect(() => {
    if (!movies || !userMovies || !searchRequest) {
      return;
    }

    if (!filteredMovies) {
      const newFilteredMovies = filterMovies(movies, searchRequest);
      setFilteredMovies(newFilteredMovies);
      setNumCardsToShow(16);
    }

  }, [movies, userMovies, searchRequest]);

  useEffect(() => {

    if (!filteredMovies) {
      return;
    }
    
    setShownCards(filteredMovies.map(cardFromMovie).slice(0, numCardsToShow));

    const filteredUserMovies = (userMovies ?? storedUserMovies).filter(userMovie => filteredMovies.some(m => m.id === userMovie.movieId));
    localStorage.setItem('moviesState', JSON.stringify({
      searchRequest, filteredMovies, filteredUserMovies, numCardsToShow
    }));

  }, [filteredMovies, userMovies, numCardsToShow]);

  return (
    <BaseMovies 
      cards={shownCards} 
      request={initialSearchRequest}
      onSearch={handleSearch} 
      onRequestChanged={handleRequestChanged}
      inProgress={inProgress} 
      onCardLike={handleCardLike} 
      onLoadMore={filteredMovies && numCardsToShow < filteredMovies.length && handleLoadMore}
    />
  );
}

export default Movies;
