import './MoviesCardList.css'

function MoviesCardList({onLoadMore, children}) {
  return (
    <section className="cards movies__cards">
      <ul className="cards__items">
        {
          children
        }
      </ul>
      {onLoadMore && (<button className="cards__btn" type="button" onClick={onLoadMore}>Ещё</button>)}
    </section>
  );
}

export default MoviesCardList;


