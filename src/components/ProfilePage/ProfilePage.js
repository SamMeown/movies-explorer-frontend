import Header from "../Header/Header";
import Profile from "../Profile/Profile";


function ProfilePage({loggedIn, onUserInfoUpdate, onLogout, error}) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Profile onUserInfoUpdate={onUserInfoUpdate} onLogout={onLogout} error={error}/>
    </>
  );
}

export default ProfilePage;
