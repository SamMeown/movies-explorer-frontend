import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";


function MoviesPage({loggedIn, movies, userMovies, onMovieLike, onSearch, error}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Movies
        movies={movies}
        userMovies={userMovies}
        onMovieLike={onMovieLike} 
        onSearch={onSearch}
        error={error} />
      <Footer />
    </>
  );
}

export default MoviesPage;
