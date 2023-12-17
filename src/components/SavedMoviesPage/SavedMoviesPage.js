import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedMovies from "../SavedMovies/SavedMovies";


function SavedMoviesPage({loggedIn, userMovies, onLoad, onUserMovieDelete, error}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <SavedMovies 
        userMovies={userMovies} 
        onLoad={onLoad} 
        onUserMovieDelete={onUserMovieDelete}
        error={error} />
      <Footer />
    </>
  );
}

export default SavedMoviesPage;