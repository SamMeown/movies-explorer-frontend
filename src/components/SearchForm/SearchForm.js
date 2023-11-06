import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css'

function SearchForm() {
  return (
    <search className="search movies__search">
      <FilterCheckbox />
    </search>
  );
}

export default SearchForm;
