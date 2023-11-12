import './MoviesCard.css'
import likeIcon from '../../images/card-icon-like.svg'
import deleteIcon from '../../images/card-icon-delete.svg'

function MoviesCard({card, isLikeMode, onCardLike, onCardDelete}) {

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name}/>
      <div className="card__name-container">
        <h2 className="card__name overflow-ready-string">{card.name}</h2>
        {isLikeMode 
          ? <button className={`card__btn card__btn_type_like ${card.isLiked ? "card__btn_clicked" : ""}`} type="button" aria-label="Лайк" onClick={handleCardLike}>
              <svg width="10" height="9" viewBox="0 0 10 9">
                <use href={`${likeIcon}#like-btn-icon`} className="card__like-icn" />
              </svg>
            </button>
          : <button className="card__btn card__btn_type_delete" type="button" aria-label="Удалить" onClick={handleCardDelete}>
              <img className="card__delete-icn" src={deleteIcon} alt="Иконка кнопки удаления" />
            </button>}
        
      </div>
      <p className="card__time">{card.time}</p>
    </li>
  );
}

export default MoviesCard;
