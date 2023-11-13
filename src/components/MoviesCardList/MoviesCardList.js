import './MoviesCardList.css'

function MoviesCardList({onLoadMore, children}) {
  return (
    <section className="cards movies__cards">
      <ul className="cards__items">
        {
          children
        }
      </ul>
      {onLoadMore && (<button className="movies-list__btn">Ещё</button>)}
    </section>
  );
}

export default MoviesCardList;


