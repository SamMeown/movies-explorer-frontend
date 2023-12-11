import './BaseMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

function BaseMovies({cards, onCardLike, onCardDelete, onLoadMore, onSearch, onRequestChanged, request, inProgress}) {

  return (
    <main className="movies">
      <SearchForm request={request} onSearch={onSearch} onRequestChanged={onRequestChanged}/>
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

export default BaseMovies;
