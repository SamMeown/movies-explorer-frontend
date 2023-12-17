import { useContext } from "react";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import CurrentUserContext from "../../contexts/CurrentUserContext";


function ProfilePage({loggedIn, onUserInfoUpdate, onLogout, error}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <>
      <Header loggedIn={loggedIn}/>
      {currentUser && 
      <Profile onUserInfoUpdate={onUserInfoUpdate} onLogout={onLogout} error={error}/>}
    </>
  );
}

export default ProfilePage;
