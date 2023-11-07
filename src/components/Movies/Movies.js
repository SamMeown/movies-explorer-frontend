import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <Preloader />
    </main>
  );
}

export default Movies;
