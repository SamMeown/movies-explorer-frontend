import './BaseMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

function BaseMovies({cards, onCardLike, onCardDelete, onLoadMore, onSearch, onRequestChanged, request, inProgress, error}) {

  return (
    <main className="movies">
      <SearchForm request={request} onSearch={onSearch} onRequestChanged={onRequestChanged}/>
      {(() => {
        if (error) {
          return (
            <p className="movies__message movies__message_type_error">Во время запроса произошла ошибка.<br/>Возможно, проблема с соединением или сервер недоступен.<br/>Подождите немного и попробуйте еще раз.</p>
          );
        } else if (inProgress) {
          return (
            <Preloader className="movies__preloader" />
          );
        } else if (!cards?.length) {
          return (
            <p className="movies__message">Ничего не найдено</p>
          );
        } else {
          return (
            <MoviesCardList onLoadMore={onLoadMore}>{
              cards.map(card => (
                <MoviesCard 
                  card={card} 
                  onCardLike={onCardLike} 
                  onCardDelete={onCardDelete} 
                  key={card.id}
                />))
              }
            </MoviesCardList>
          );
        }
      })()}
    </main>
  );
}

export default BaseMovies;
