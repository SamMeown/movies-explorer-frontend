import "./MainPromo.css";
import heroImg from "../../images/fest-hero-cover.png"
import { useNavigate } from "react-router";

function MainPromo({loggedIn}) {
  
  const navigate = useNavigate();

  function handleCtaClick() {
    navigate('/movies');
  }

  return (
    <main className="main-promo">
      <section className="hero">
        <img className="hero__image" src={heroImg} alt="hero image from fantastic night movie fest in a desert"/>
        <div className="hero__content-container">
          <div className="hero__header-container">
            <h1 className="hero__header">Discover the Edge of Change</h1>
            <p className="hero__text">Explore the World's Finest Documentaries on New<span className="space"/>Culture</p>
          </div>
          <button 
            className="hero__button" 
            type="button" 
            onClick={handleCtaClick}
          >{loggedIn ? "Explore movies" : "Start Now"}</button>
        </div>
      </section>
    </main>
  );
}

export default MainPromo;
