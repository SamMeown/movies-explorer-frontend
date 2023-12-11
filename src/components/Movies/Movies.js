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
      isLiked: userMovies.some(userMovie => userMovie.movieId === movie.id),
      time: `${Math.trunc(movie.duration / 60)}ч${movie.duration % 60}м`
    };

    return card;
  }

  function handleSearch({request, short}) {
    setSearchRequest({request, short})
    setIsDirtyRequest(false);
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
    const movie = movies.find(m => m.id === card.id);
    onMovieLike(movie, card.isLiked);
  }

  function handleRequestChanged(values) {
    if (!searchRequest?.request?.length) {
      return;
    }

    if (searchRequest.request !== values.request) {
      setIsDirtyRequest(true);
      return;
    }

    if (!isDirtyRequest && searchRequest.request !== values.short){
      setSearchRequest(values);
    }
  }

  const [inProgress, setInProgress] = useState(false);
  const [searchRequest, setSearchRequest] = useState(null);

  const [isDirtyRequest, setIsDirtyRequest] = useState(true);

  const [filteredMovies, setFilteredMovies] = useState([]);

  const [shownCards, setShownCards] = useState([]);
  const [numCardsToShow, setNumCardsToShow] = useState(0);

  useEffect(() => {
    setInProgress((!movies || !userMovies) && searchRequest);
  }, [movies, userMovies, searchRequest]);

  useEffect(() => {
    if (!movies || !userMovies || !searchRequest) {
      return;
    }

    setFilteredMovies(filterMovies(movies, searchRequest));
    setNumCardsToShow(16);

  }, [movies, userMovies, searchRequest]);

  useEffect(() => {
    console.log(filteredMovies.map(cardFromMovie).slice(0, numCardsToShow));
    setShownCards(filteredMovies.map(cardFromMovie).slice(0, numCardsToShow))
  }, [filteredMovies, numCardsToShow]);

  return (
    <BaseMovies 
      cards={shownCards} 
      onSearch={handleSearch} 
      onRequestChanged={handleRequestChanged}
      inProgress={inProgress} 
      onCardLike={handleCardLike} 
      onLoadMore={numCardsToShow < filteredMovies.length && handleLoadMore}
    />
  );
}

export default Movies;
