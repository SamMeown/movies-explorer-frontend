import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';

function SearchForm() {
  return (
    <search className="search movies__search">
      <div className="search__form-container">
        <form className="search__form" name="search-form">
          <fieldset className="search__fieldset">
            <div className="search__main-container">
              <label className="search__request-label">
                <img className="search__request-icon" src={searchIcon} alt="иконка поиска" />
                <input className="search__request-input" type="text" name="request" placeholder="Фильм" minLength="2" maxLength="200"/>
              </label>
              <button className="search__submit-btn" type="submit">Найти</button>
            </div>
            <hr className="search__divider"/>
            <div className="search__checkbox-container">
              <FilterCheckbox />
            </div>
          </fieldset>
        </form>
      </div>
    </search>
  );
}

export default SearchForm;
