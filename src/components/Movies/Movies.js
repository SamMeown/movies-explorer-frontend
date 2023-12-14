import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

function Movies({cards, onCardLike, onCardDelete, onLoadMore, inProgress}) {

  return (
    <main className="movies">
      <SearchForm />
      {inProgress 
        ? <Preloader className="movies__preloader" /> 
        : <MoviesCardList onLoadMore={onLoadMore}>{
            cards.map(card => (
              <MoviesCard 
                card={card} 
                onCardLike={onCardLike} 
                onCardDelete={onCardDelete} 
                key={card.id}
              />))
            }
          </MoviesCardList>}
    </main>
  );
}

export default Movies;
