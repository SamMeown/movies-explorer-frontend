import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import { useForm } from '../../hooks/form';
import { useEffect, useRef, useState } from 'react';


function SearchForm({request, onRequestChanged, onSearch}) {
  const {values, setValues, handleChange} = useForm({
    request: request?.request ?? "",
    short: request?.short ?? false
    });

  const dontNotify = useRef(true);

  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    if (request) {
      setValues(request);
      dontNotify.current = true;
    } 
  }, [request]);

  useEffect(() => {
    if (dontNotify.current) {
      dontNotify.current = false;
      return;
    }

    onRequestChanged && onRequestChanged(values);
  }, [values]);

  useEffect(() => {
    setRequestError("");
  }, [values]);

  function handleSubmit(evt) {
    evt.preventDefault();
    
    const {error} = onSearch(values);
    if (error) {
      setRequestError(error);
    }
  }

  return (
    // Похоже в w3 валидаторе имеется баг из-за которого на тэг search всегда выскакивает ошибка.
    // На stackoverflow тоже жалуются на это. Более того, валидацию не проходят даже примеры из 
    // спецификации https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element 
    // Я перепроверил по описанию - тэг search внутри тэга main - более чем нормально.
    <search className="search movies__search">
      <div className="search__form-container">
        <form className="search__form" name="search-form" onSubmit={handleSubmit}>
          <fieldset className="search__fieldset">
            <div className="search__main-container">
              <label className="search__request-label">
                <img className="search__request-icon" src={searchIcon} alt="иконка поиска" />
                <input className="search__request-input" type="text" name="request" placeholder="Фильм" maxLength="200" value={values.request}  onChange={handleChange}/>
                <span 
                  className={`search__input-error ${requestError ? "search__input-error_active" : ""}`}
                >{requestError}</span>
              </label>
              <button className="search__submit-btn" type="submit">Найти</button>
            </div>
            <div className="search__checkbox-container">
              <FilterCheckbox name="short" value={values.short} onChange={handleChange} />
            </div>
          </fieldset>
        </form>
      </div>
    </search>
  );
}

export default SearchForm;
